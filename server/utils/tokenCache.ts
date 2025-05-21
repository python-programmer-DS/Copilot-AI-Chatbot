type TokenCacheEntry = {
  token: string;
  expiry: number;
};

export class TokenCache {
  private cache: Map<string, TokenCacheEntry> = new Map();
  private readonly TTL = 55 * 60 * 1000; // 55 minutes

  get(tenantId: string): string | null {
    const entry = this.cache.get(tenantId);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(tenantId);
      return null;
    }
    return entry.token;
  }

  set(tenantId: string, token: string): void {
    this.cache.set(tenantId, {
      token,
      expiry: Date.now() + this.TTL,
    });
  }
}