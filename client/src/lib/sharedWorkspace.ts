import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { firebaseAuth, firestore } from "./firebase";

export const ALLOWED_EMAILS = ["yuridesousasilva@gmail.com", "amanda.mds171@gmail.com", "rainhadascapas35@gmail.com", "orlando_soscelular@gmail.com", "yurihbo2@gmail.com"] as const;
export const ADMIN_EMAIL = "yuridesousasilva@gmail.com";
export type SharedSellerItem = { clientId?: string; item: string; quantity: number; unit: string; total: string; date: string; note: string };
export type SharedSeller = { clientId?: string; name: string; initials: string; phone: string; total: string; status: string; updated: string; tone: string; avatar?: string; items?: SharedSellerItem[] };
export type SharedCatalogStore = { id: string; name: string; categories: Array<{ id: string; name: string; subcategories: Array<{ id: string; name: string; items: Array<{ id: string; name: string }> }> }> };
type WorkspaceData = { sellers?: SharedSeller[]; catalog?: SharedCatalogStore[] };

export function isAllowedSession(user: Pick<User, "email" | "isAnonymous"> | null | undefined) {
  const email = user?.email?.toLowerCase();
  return Boolean(email && user?.isAnonymous !== true && ALLOWED_EMAILS.includes(email as (typeof ALLOWED_EMAILS)[number]));
}

function isAllowedUser(user: User | null) {
  return isAllowedSession(user);
}

export function useGoogleSession() {
  const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const provider = useMemo(() => new GoogleAuthProvider(), []);
  useEffect(() => onAuthStateChanged(firebaseAuth, (next) => {
    if (next && !isAllowedUser(next)) {
      setUser(null);
      setError(next.isAnonymous ? "O acesso anônimo foi desativado. Entre com uma conta Google autorizada." : `A conta ${next.email ?? "informada"} não está autorizada neste workspace.`);
      void signOut(firebaseAuth);
      setLoading(false);
      return;
    }
    setUser(next); setError(null); setLoading(false);
  }), []);
  const signIn = useCallback(async () => {
    setError(null); setLoading(true);
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      if (!isAllowedUser(result.user)) { await signOut(firebaseAuth); throw new Error(`A conta ${result.user.email ?? "informada"} não está autorizada neste workspace.`); }
      setUser(result.user);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Não foi possível concluir o login Google."); } finally { setLoading(false); }
  }, [provider]);
  const logout = useCallback(() => signOut(firebaseAuth), []);
  return { user, loading, error, signIn, logout, isAdmin: user?.email?.toLowerCase() === ADMIN_EMAIL };
}

export function useSharedWorkspace(seedSellers: SharedSeller[], seedCatalog: SharedCatalogStore[]) {
  const [sellers, setSellers] = useState(seedSellers);
  const [catalog, setCatalog] = useState(seedCatalog);
  const [ready, setReady] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const session = useGoogleSession();
  const ref = useMemo(() => doc(firestore, "sharedWorkspaces", "main"), []);
  const sellersRef = useRef(sellers);
  const catalogRef = useRef(catalog);
  useEffect(() => { sellersRef.current = sellers; }, [sellers]);
  useEffect(() => { catalogRef.current = catalog; }, [catalog]);

  useEffect(() => {
    setReady(false);
    setSyncError(null);
    if (!session.user) return;
    return onSnapshot(ref, (snapshot) => {
      const data = snapshot.data() as WorkspaceData | undefined;
      const nextSellers = data?.sellers ?? seedSellers;
      const nextCatalog = data?.catalog ?? seedCatalog;
      sellersRef.current = nextSellers;
      catalogRef.current = nextCatalog;
      setSellers(nextSellers);
      setCatalog(nextCatalog);
      if (!snapshot.exists()) void setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() }).catch((error) => { console.error("[sharedWorkspace] initial write error", error); setSyncError("Não foi possível criar o espaço compartilhado. Verifique as regras do Firebase."); });
      setReady(true);
    }, (error) => {
      console.error("[sharedWorkspace] listener error", error);
      setSyncError("Não foi possível ler o espaço compartilhado. Verifique as regras do Firebase.");
      setReady(true);
    });
  }, [session.user, ref, seedSellers, seedCatalog]);

  const persist = useCallback(async (nextSellers: SharedSeller[], nextCatalog: SharedCatalogStore[]) => {
    if (!session.user) return;
    try {
      await setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() }, { merge: true });
      setSyncError(null);
    } catch (error) {
      console.error("[sharedWorkspace] write error", error);
      setSyncError("A alteração ficou local e não foi enviada ao espaço compartilhado.");
    }
  }, [ref, session.user]);

  const updateSellers = useCallback((updater: SharedSeller[] | ((current: SharedSeller[]) => SharedSeller[])) => {
    const next = typeof updater === "function" ? (updater as (current: SharedSeller[]) => SharedSeller[])(sellersRef.current) : updater;
    sellersRef.current = next;
    setSellers(next);
    void persist(next, catalogRef.current);
  }, [persist]);
  const updateCatalog = useCallback((updater: SharedCatalogStore[] | ((current: SharedCatalogStore[]) => SharedCatalogStore[])) => {
    const next = typeof updater === "function" ? (updater as (current: SharedCatalogStore[]) => SharedCatalogStore[])(catalogRef.current) : updater;
    catalogRef.current = next;
    setCatalog(next);
    void persist(sellersRef.current, next);
  }, [persist]);

  return { sellers, setSellers: updateSellers, catalog, setCatalog: updateCatalog, ready, syncError, session };
}
