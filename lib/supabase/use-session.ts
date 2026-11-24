// Re-export pour ne pas casser les imports existants.
// L'implémentation a été déplacée dans session-context.tsx où le hook
// lit l'état depuis un Provider partagé (fix N+1 fetch).
export { useSession, SessionProvider } from './session-context';
export type { ClientSession } from './session-context';
