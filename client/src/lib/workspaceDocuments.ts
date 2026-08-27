import { collection, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { firestore } from "./firebase";
import type { SharedCatalogStore, SharedReport, SharedSeller, WorkspaceData } from "./sharedWorkspace";

export const INDIVIDUAL_SCHEMA_VERSION = 1;
const BATCH_LIMIT = 400;

export type IndividualMigrationResult = {
  migrationId: string;
  writes: number;
  sellers: number;
  items: number;
  catalog: number;
  reports: number;
};

function sellerId(seller: SharedSeller, index: number) {
  return seller.clientId || `seller-${index + 1}`;
}

function itemId(item: NonNullable<SharedSeller["items"]>[number], index: number) {
  return item.clientId || `item-${index + 1}-${item.item.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}


export async function migrateWorkspaceToDocuments(workspace: WorkspaceData): Promise<IndividualMigrationResult> {
  const migrationId = `migration-${Date.now()}`;
  const sellers = workspace.sellers ?? [];
  const catalog = workspace.catalog ?? [];
  const reports = workspace.reports ?? [];
  const writes: Array<{ ref: ReturnType<typeof doc>; data: Record<string, unknown> }> = [];

  sellers.forEach((seller, sellerIndex) => {
    const id = sellerId(seller, sellerIndex);
    const sellerRef = doc(collection(firestore, "sharedWorkspaces", "main", "sellers"), id);
    const { items = [], ...sellerFields } = seller;
    writes.push({ ref: sellerRef, data: { ...sellerFields, migrationId, schemaVersion: INDIVIDUAL_SCHEMA_VERSION } });
    items.forEach((item, itemIndex) => {
      const itemRef = doc(collection(firestore, "sharedWorkspaces", "main", "sellers", id, "items"), itemId(item, itemIndex));
      writes.push({ ref: itemRef, data: { ...item, migrationId, schemaVersion: INDIVIDUAL_SCHEMA_VERSION } });
    });
  });

  catalog.forEach((store) => {
    writes.push({ ref: doc(collection(firestore, "sharedWorkspaces", "main", "catalog"), store.id), data: { ...store, migrationId, schemaVersion: INDIVIDUAL_SCHEMA_VERSION } });
  });
  reports.forEach((report) => {
    writes.push({ ref: doc(collection(firestore, "sharedWorkspaces", "main", "reports"), report.id), data: { ...report, migrationId, schemaVersion: INDIVIDUAL_SCHEMA_VERSION } });
  });

  for (let start = 0; start < writes.length; start += BATCH_LIMIT) {
    const batch = writeBatch(firestore);
    writes.slice(start, start + BATCH_LIMIT).forEach(({ ref, data }) => batch.set(ref, data, { merge: true }));
    await batch.commit();
  }

  const metadataRef = doc(firestore, "sharedWorkspaces", "main", "meta", "individualModel");
  await setDoc(metadataRef, {
    schemaVersion: INDIVIDUAL_SCHEMA_VERSION,
    migrationId,
    migratedAt: new Date().toISOString(),
    sellers: sellers.length,
    items: sellers.reduce((total, seller) => total + (seller.items?.length ?? 0), 0),
    catalog: catalog.length,
    reports: reports.length,
  }, { merge: true });

  return {
    migrationId,
    writes: writes.length + 1,
    sellers: sellers.length,
    items: sellers.reduce((total, seller) => total + (seller.items?.length ?? 0), 0),
    catalog: catalog.length,
    reports: reports.length,
  };
}

export async function readIndividualWorkspace(): Promise<WorkspaceData | null> {
  const metadata = await getDocs(collection(firestore, "sharedWorkspaces", "main", "meta"));
  if (metadata.empty) return null;
  const [sellerSnapshots, catalogSnapshots, reportSnapshots] = await Promise.all([
    getDocs(collection(firestore, "sharedWorkspaces", "main", "sellers")),
    getDocs(collection(firestore, "sharedWorkspaces", "main", "catalog")),
    getDocs(collection(firestore, "sharedWorkspaces", "main", "reports")),
  ]);
  const sellers = await Promise.all(sellerSnapshots.docs.map(async (sellerSnapshot) => {
    const itemsSnapshot = await getDocs(collection(firestore, "sharedWorkspaces", "main", "sellers", sellerSnapshot.id, "items"));
    return { ...sellerSnapshot.data(), items: itemsSnapshot.docs.map((item) => item.data()) } as SharedSeller;
  }));
  return {
    sellers,
    catalog: catalogSnapshots.docs.map((snapshot) => snapshot.data() as SharedCatalogStore),
    reports: reportSnapshots.docs.map((snapshot) => snapshot.data() as SharedReport),
  };
}
