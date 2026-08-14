import { signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { firebaseAuth, firestore } from "./firebase";

export type SharedSellerItem = { clientId?: string; item: string; quantity: number; unit: string; total: string; date: string; note: string };
export type SharedSeller = { clientId?: string; name: string; initials: string; phone: string; total: string; status: string; updated: string; tone: string; avatar?: string; items?: SharedSellerItem[] };
export type SharedCatalogStore = { id: string; name: string; categories: Array<{ id: string; name: string; subcategories: Array<{ id: string; name: string; items: Array<{ id: string; name: string }> }> }> };
type WorkspaceData = { sellers?: SharedSeller[]; catalog?: SharedCatalogStore[] };

export function useAnonymousSession() {
  const [user, setUser] = useState<User | null>(firebaseAuth.currentUser);
  const [loading, setLoading] = useState(!firebaseAuth.currentUser);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (next) => { setUser(next); setLoading(false); });
    if (!firebaseAuth.currentUser) signInAnonymously(firebaseAuth).catch((err: unknown) => { setError(err instanceof Error ? err.message : "Ative o login anônimo no Firebase"); setLoading(false); });
    return unsubscribe;
  }, []);
  return { user, loading, error };
}

export function useSharedWorkspace(seedSellers: SharedSeller[], seedCatalog: SharedCatalogStore[]) {
  const [sellers, setSellers] = useState(seedSellers);
  const [catalog, setCatalog] = useState(seedCatalog);
  const [ready, setReady] = useState(false);
  const session = useAnonymousSession();
  const ref = useMemo(() => doc(firestore, "sharedWorkspaces", "main"), []);
  const lastRemoteSignature = useRef<string | null>(null);
  useEffect(() => {
    if (!session.user) return;
    return onSnapshot(ref, (snapshot) => {
      const data = snapshot.data() as WorkspaceData | undefined;
      const nextSellers = data?.sellers ?? seedSellers;
      const nextCatalog = data?.catalog ?? seedCatalog;
      setSellers(nextSellers);
      setCatalog(nextCatalog);
      if (!snapshot.exists()) void setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() });
      lastRemoteSignature.current = JSON.stringify({ sellers: nextSellers, catalog: nextCatalog });
      setReady(true);
    }, () => setReady(true));
  }, [session.user, ref, seedSellers, seedCatalog]);
  const persist = useCallback(async (nextSellers: SharedSeller[], nextCatalog: SharedCatalogStore[]) => {
    const signature = JSON.stringify({ sellers: nextSellers, catalog: nextCatalog });
    if (signature === lastRemoteSignature.current) return;
    await setDoc(ref, { sellers: nextSellers, catalog: nextCatalog, updatedAt: Date.now() }, { merge: true });
    lastRemoteSignature.current = signature;
  }, [ref]);
  useEffect(() => { if (ready && session.user) void persist(sellers, catalog); }, [ready, session.user, sellers, catalog, persist]);
  return { sellers, setSellers, catalog, setCatalog, ready, session };
}
