import { CacheEntry } from './types';

export class Cache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map<string, CacheEntry>();
  }

  public get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (entry && new Date() < entry.expiresAt) {
      return entry;
    } else {
      this.cache.delete(key);
      return null;
    }
  }

  public set(key: string, data: Buffer, ttl: number): void {
    const cachedAt = new Date();
    const expiresAt = new Date(cachedAt.getTime() + ttl * 1000);
    const entry: CacheEntry = { data, cachedAt, expiresAt };
    this.cache.set(key, entry);
  }
}
