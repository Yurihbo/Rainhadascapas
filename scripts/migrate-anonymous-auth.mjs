import fs from 'node:fs';
const path = 'client/src/lib/sharedWorkspace.ts';
let source = fs.readFileSync(path, 'utf8');
source = source.replace(
  'import { browserLocalPersistence, getRedirectResult, GoogleAuthProvider, indexedDBLocalPersistence, onAuthStateChanged, setPersistence, signInWithPopup, signInWithRedirect, signOut, type User } from "firebase/auth";',
  'import { browserLocalPersistence, indexedDBLocalPersistence, onAuthStateChanged, setPersistence, signInAnonymously, signOut, type User } from "firebase/auth";'
);
const start = source.indexOf('export function isAllowedSession');
const end = source.indexOf('export function useSharedWorkspace');
if (start < 0 || end < 0 || end <= start) throw new Error('auth block boundaries not found');
const replacement = `export function isAllowedSession(user: Pick<User, "email" | "isAnonymous"> | null | undefined) {
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

`;
source = source.slice(0, start) + replacement + source.slice(end);
source = source.replace('const session = useGoogleSession();', 'const session = useAnonymousSession();');
source = source.replace(/session\.user\?\.email \?\? session\.user\?\.uid/g, 'session.user?.uid ?? "anonymous"');
fs.writeFileSync(path, source);
console.log('Anonymous Auth migration applied to shared workspace.');
