import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { firebaseAuth, firestore } from "./firebase";

export const ALLOWED_EMAILS = ["yuridesousasilva@gmail.com", "amanda.mds171@gmail.com", "rainhadascapas35@gmail.com", "orlando_soscelular@gmail.com", "yurihbo2@gmail.com"] as const;
export const ADMIN_EMAIL = "yuridesousasilva@gmail.com";
export type SharedSellerItem = { clientId?: string; item: string; quantity: number; unit: string; total: string; date: string; note: string };
export type SharedSeller = { clientId?: string; name: string; initials: string; phone: string; total: string; status: string; updated: string; tone: string; avatar?: string; items?: SharedSellerItem[] };
export type SharedCatalogStore = { id: string; name: string; categories: Array<{ id: string; name: string; subcategories: Array<{ id: string; name: string; items: Array<{ id: string; name: string }> }> }> };
type WorkspaceData = { sellers?: SharedSeller[]; catalog?: SharedCatalogStore[] };

function isAllowedUser(user: User | null) {
  const email = user?.email?.toLowerCase();
  return Boolean(email && !user?.isAnonymous && ALLOWED_EMAILS.includes(email as (typeof ALLOWED_EMAILS)[number]));
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
  const session = useGoogleSession();
  const ref = useMemo(() => doc(firestore, "sharedWorkspaces", "main"), []);
  useEffect(() => {
    setReady(false);
    if (!session.user) return;
    return onSnapshot(ref, (snapshot) => {
      const data = snapshot.data() as WorkspaceData | undefined;
      const nextSellers = data?.sellers ?? seedSellers;
      const nextCatalog = data?.catalog ?? seedCatalog;
      setSellers(nextSellers); setCatalog(nextCatalog);
      if (!snapshot.exists()) void setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() });
      setReady(true);
    }, () => setReady(true));
  }, [session.user, ref, seedSellers, seedCatalog]);
  const persist = useCallback(async (nextSellers: SharedSeller[], nextCatalog: SharedCatalogStore[]) => {
    if (!session.user) return;
    await setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() }, { merge: true });
  }, [ref, session.user]);
  useEffect(() => { if (ready && session.user) void persist(sellers, catalog); }, [ready, session.user, sellers, catalog, persist]);
  return { sellers, setSellers, catalog, setCatalog, ready, session };
}
