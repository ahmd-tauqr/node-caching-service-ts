export interface CacheEntry {
  data: Buffer;
  cachedAt: Date;
  expiresAt: Date;
}
