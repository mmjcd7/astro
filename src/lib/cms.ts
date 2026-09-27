import { getEmDashCollection } from 'emdash';

/** Load a published collection ordered by sort_order. Returns [] and logs on error so the page still renders. */
export async function loadPlans<T = Record<string, any>>(collection: string): Promise<T[]> {
  const { entries, error } = await getEmDashCollection(collection as any, {
    orderBy: { sort_order: 'asc' },
  } as any);
  if (error) {
    console.error(`[cms] failed to load ${collection}:`, error);
    return [];
  }
  return entries.map((e: any) => e.data as T);
}

/** First published hero entry, or null. */
export async function loadHero(): Promise<Record<string, any> | null> {
  const { entries, error } = await getEmDashCollection('hero' as any, { limit: 1 } as any);
  if (error) {
    console.error('[cms] failed to load hero:', error);
    return null;
  }
  return entries[0]?.data ?? null;
}

export const perkLines = (s?: string) => (s ?? '').split('\n').map(x => x.trim()).filter(Boolean);
