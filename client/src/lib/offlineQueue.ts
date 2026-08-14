export type OfflineAction = {
  id: string;
  operationType: string;
  payload: Record<string, unknown>;
  action: string;
  description: string;
  createdAt: number;
};

const QUEUE_KEY = "rainha-offline-actions";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function createOperationId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `op-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function readOfflineQueue(): OfflineAction[] {
  if (!canUseStorage()) return [];
  try {
    const value = window.localStorage.getItem(QUEUE_KEY);
    const parsed = value ? (JSON.parse(value) as Partial<OfflineAction>[]) : [];
    return parsed.map((item) => ({ id: item.id ?? createOperationId(), operationType: item.operationType ?? "activity", payload: item.payload ?? {}, action: item.action ?? "Atividade", description: item.description ?? "Atividade registrada offline", createdAt: item.createdAt ?? Date.now() }));
  } catch {
    return [];
  }
}

function writeOfflineQueue(queue: OfflineAction[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  window.dispatchEvent(new CustomEvent("rainha-offline-queue-change"));
}

export function enqueueOfflineAction(action: Omit<OfflineAction, "createdAt"> & { createdAt?: number }) {
  const queue = readOfflineQueue();
  writeOfflineQueue([...queue, { ...action, id: action.id || createOperationId(), createdAt: action.createdAt ?? Date.now() }]);
}

export function removeOfflineAction(id: string) {
  writeOfflineQueue(readOfflineQueue().filter((item) => item.id !== id));
}

export function queueSnapshot() {
  return readOfflineQueue().length;
}
