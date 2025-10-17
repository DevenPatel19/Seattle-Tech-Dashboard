// Use generics to make the cache type-safe for any data type
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// The cache can store any type, but we'll use generics to maintain type safety
const cache = new Map<string, CacheItem<unknown>>();

export function getFromCache<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) return null;

  const isExpired = Date.now() - item.timestamp > CACHE_DURATION;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  // We cast to T because we assume the caller knows what type they stored
  return item.data as T;
}

export function setToCache<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// Optional: Clear expired cache items periodically
export function clearExpiredCache(): void {
  const now = Date.now();
  for (const [key, item] of cache.entries()) {
    if (now - item.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}