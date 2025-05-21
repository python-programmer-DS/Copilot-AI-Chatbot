import { TenantConfig } from '../types/TenantConfig';

export const tenants: Record<string, TenantConfig> = {
  ancenergy: {
    tokenUrl: process.env.VITE_COPILOT_API_URL ||
      'https://defaulta5bb70244afb4922bb2ab8bec4f12b.b9.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr59c_ancenergyUtilityBot/directline/token?api-version=2022-03-01-preview',
  },
};