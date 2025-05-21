import { tenants } from '../config/tenants';

export function validateTenant(tenantId: string): boolean {
  return Boolean(tenantId && tenants[tenantId]);
}