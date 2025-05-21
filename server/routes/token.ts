import { Router, RequestHandler } from 'express';
import { tenants } from '../config/tenants';
import { fetchCopilotToken } from '../utils/fetchToken';
import { TokenCache } from '../utils/tokenCache';

const router = Router();
const tokenCache = new TokenCache();

const tokenHandler: RequestHandler = async (req, res, next) => {
  const tenantId = req.query.tenant as string;
  const config = tenants[tenantId];

  if (!tenantId || !config) {
    res.status(400).json({ error: 'Invalid or missing tenant' });
    return;
  }

  // Check cache first
  const cachedToken = tokenCache.get(tenantId);
  if (cachedToken) {
    res.json({ token: cachedToken });
    return;
  }

  try {
    const token = await fetchCopilotToken(config.tokenUrl);
    tokenCache.set(tenantId, token);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

router.get('/', tokenHandler);

export default router;