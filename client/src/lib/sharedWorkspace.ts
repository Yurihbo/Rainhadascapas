import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { browserLocalPersistence, indexedDBLocalPersistence, onAuthStateChanged, setPersistence, signInAnonymously, signOut, type User } from "firebase/auth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { firebaseAuth, firestore } from "./firebase";

export const ALLOWED_EMAILS = ["yuridesousasilva@gmail.com", "amanda.mds171@gmail.com", "rainhadascapas35@gmail.com", "orlando_soscelular@gmail.com", "yurihbo2@gmail.com"] as const;
export const ADMIN_EMAIL = "yuridesousasilva@gmail.com";
export type SharedSellerItem = { clientId?: string; item: string; quantity: number; unit: string; total: string; date: string; note: string };
export type SharedSeller = { clientId?: string; name: string; initials: string; phone: string; total: string; status: string; updated: string; tone: string; avatar?: string; items?: SharedSellerItem[] };
export type SharedCatalogStore = { id: string; name: string; categories: Array<{ id: string; name: string; subcategories: Array<{ id: string; name: string; items: Array<{ id: string; name: string }> }> }> };
export type SharedReport = { id: string; title: string; type: string; week: string; createdAt: number };
export type WorkspaceData = { sellers?: SharedSeller[]; catalog?: SharedCatalogStore[]; reports?: SharedReport[] };

export function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) return value.map((item) => stripUndefined(item)).filter((item) => item !== undefined) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined).map(([key, item]) => [key, stripUndefined(item)])) as T;
  }
  return value;
}

export function reconcileWorkspaceData(data: WorkspaceData | undefined, current: WorkspaceData): WorkspaceData {
  return {
    sellers: Array.isArray(data?.sellers) ? data.sellers : current.sellers ?? [],
    catalog: Array.isArray(data?.catalog) ? data.catalog : current.catalog ?? [],
    reports: Array.isArray(data?.reports) ? data.reports : current.reports ?? [],
  };
}

export function isAllowedSession(user: Pick<User, "email" | "isAnonymous"> | null | undefined) {
  return Boolean(user?.isAnonymous);
}

function isAllowedUser(user: User | null) {
  return Boolean(user?.isAnonymous);
}

export function isIosStandaloneContext() {
  if (typeof window === "undefined") return false;
  const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return ios && standalone;
}

export function useAnonymousSession() {
  const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ensureAnonymousUser = useCallback(async () => {
    if (firebaseAuth.currentUser?.isAnonymous) return firebaseAuth.currentUser;
    if (firebaseAuth.currentUser && !firebaseAuth.currentUser.isAnonymous) await signOut(firebaseAuth);
    return (await signInAnonymously(firebaseAuth)).user;
  }, []);
  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    const restore = async () => {
      try {
        try { await setPersistence(firebaseAuth, indexedDBLocalPersistence); }
        catch { await setPersistence(firebaseAuth, browserLocalPersistence); }
        const next = await ensureAnonymousUser();
        if (active) { setUser(next); setError(null); }
      } catch (err: unknown) {
        if (active) { setUser(null); setError(err instanceof Error ? err.message : "Não foi possível iniciar o acesso automático."); }
      } finally {
        if (active) setLoading(false);
      }
    };
    unsubscribe = onAuthStateChanged(firebaseAuth, (next) => {
      if (!active) return;
      if (next?.isAnonymous) setUser(next);
    });
    void restore();
    return () => { active = false; unsubscribe?.(); };
  }, [ensureAnonymousUser]);
  const logout = useCallback(async () => {
    await signOut(firebaseAuth);
    setUser(null);
    await ensureAnonymousUser().then(setUser).catch((err: unknown) => setError(err instanceof Error ? err.message : "Não foi possível restaurar o acesso automático."));
  }, [ensureAnonymousUser]);
  return { user, loading, error, signIn: ensureAnonymousUser, logout, isAdmin: false, isIosStandalone: isIosStandaloneContext() };
}

export function useSharedWorkspace(seedSellers: SharedSeller[], seedCatalog: SharedCatalogStore[]) {
  const [sellers, setSellers] = useState(seedSellers);
  const [catalog, setCatalog] = useState(seedCatalog);
  const [reports, setReports] = useState<SharedReport[]>([]);
  const [ready, setReady] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const session = useAnonymousSession();
  const ref = useMemo(() => doc(firestore, "sharedWorkspaces", "main"), []);
  const sellersRef = useRef(sellers);
  const catalogRef = useRef(catalog);
  const reportsRef = useRef(reports);
  const writeQueueRef = useRef<Promise<void>>(Promise.resolve());
  useEffect(() => { sellersRef.current = sellers; }, [sellers]);
  useEffect(() => { catalogRef.current = catalog; }, [catalog]);
  useEffect(() => { reportsRef.current = reports; }, [reports]);

  useEffect(() => {
    setReady(false);
    setSyncError(null);
    if (!session.user) return;
    let active = true;
    let creating = false;
    const applySnapshot = (snapshot: { exists: () => boolean; data: () => Record<string, unknown> | undefined; metadata?: { fromCache?: boolean; hasPendingWrites?: boolean } }) => {
      if (!snapshot.exists()) {
        if (creating) return;
        creating = true;
        const initialSellers = sellersRef.current.length ? sellersRef.current : seedSellers;
        const initialCatalog = catalogRef.current.length ? catalogRef.current : seedCatalog;
        const initialReports = reportsRef.current;
        void setDoc(ref, { sellers: initialSellers, catalog: initialCatalog, reports: initialReports, updatedAt: Date.now(), updatedBy: session.user?.uid ?? "anonymous" }, { merge: true })
          .then(() => { if (active) setReady(true); })
          .catch((error) => {
            console.error("[sharedWorkspace] creation error", error);
            if (active) { setSyncError("Não foi possível criar o espaço compartilhado. Verifique as regras do Firebase."); setReady(true); }
          });
        return;
      }
      const reconciled = reconcileWorkspaceData(snapshot.data() as WorkspaceData | undefined, { sellers: sellersRef.current, catalog: catalogRef.current });
      const nextSellers = reconciled.sellers ?? [];
      const nextCatalog = reconciled.catalog ?? [];
      const nextReports = reconciled.reports ?? [];
      sellersRef.current = nextSellers;
      catalogRef.current = nextCatalog;
      reportsRef.current = nextReports;
      setSellers(nextSellers);
      setCatalog(nextCatalog);
      setReports(nextReports);
      setReady(true);
      console.info("[sharedWorkspace] snapshot", {
        sellers: nextSellers.length,
        catalog: nextCatalog.length,
        fromCache: snapshot.metadata?.fromCache ?? false,
        hasPendingWrites: snapshot.metadata?.hasPendingWrites ?? false,
      });
    };
    const unsubscribe = onSnapshot(ref, { includeMetadataChanges: true }, (snapshot) => {
      if (active) applySnapshot(snapshot);
    }, (error) => {
      console.error("[sharedWorkspace] listener error", error);
      if (active) { setSyncError("Não foi possível ler o espaço compartilhado. Verifique as regras do Firebase."); setReady(true); }
    });
    return () => { active = false; unsubscribe(); };
  }, [session.user, ref, seedSellers, seedCatalog]);

  const persist = useCallback((nextSellers: SharedSeller[], nextCatalog: SharedCatalogStore[], nextReports = reportsRef.current) => {
    if (!session.user) return;
    const payload = stripUndefined({ sellers: nextSellers, catalog: nextCatalog, reports: nextReports, updatedAt: Date.now(), updatedBy: session.user.email ?? session.user.uid });
    writeQueueRef.current = writeQueueRef.current
      .catch(() => undefined)
      .then(async () => {
        await setDoc(ref, payload, { merge: true });
        console.info("[sharedWorkspace] write committed", { sellers: nextSellers.length, catalog: nextCatalog.length, updatedBy: payload.updatedBy });
        setSyncError(null);
      })
      .catch((error) => {
        console.error("[sharedWorkspace] write error", { code: error?.code, message: error?.message, user: session.user?.email });
        setSyncError("A alteração não foi salva no espaço compartilhado. Verifique sua conexão e as regras do Firebase.");
      });
  }, [ref, session.user]);

  const updateSellers = useCallback((updater: SharedSeller[] | ((current: SharedSeller[]) => SharedSeller[])) => {
    const next = typeof updater === "function" ? (updater as (current: SharedSeller[]) => SharedSeller[])(sellersRef.current) : updater;
    sellersRef.current = next;
    setSellers(next);
    persist(next, catalogRef.current);
  }, [persist]);
  const updateCatalog = useCallback((updater: SharedCatalogStore[] | ((current: SharedCatalogStore[]) => SharedCatalogStore[])) => {
    const next = typeof updater === "function" ? (updater as (current: SharedCatalogStore[]) => SharedCatalogStore[])(catalogRef.current) : updater;
    catalogRef.current = next;
    setCatalog(next);
    persist(sellersRef.current, next, reportsRef.current);
  }, [persist]);
  const updateReports = useCallback((updater: SharedReport[] | ((current: SharedReport[]) => SharedReport[])) => {
    const next = typeof updater === "function" ? (updater as (current: SharedReport[]) => SharedReport[])(reportsRef.current) : updater;
    reportsRef.current = next;
    setReports(next);
    persist(sellersRef.current, catalogRef.current, next);
  }, [persist]);

  return { sellers, setSellers: updateSellers, catalog, setCatalog: updateCatalog, reports, setReports: updateReports, ready, syncError, session };
}
