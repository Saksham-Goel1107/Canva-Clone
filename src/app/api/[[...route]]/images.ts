import { verifyAuth } from '@hono/auth-js';
import { Hono } from 'hono';

import { unsplash } from '@/lib/unsplash';

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ['317099'];

const app = new Hono().get('/', verifyAuth(), async (ctx) => {
  const images = await unsplash.photos.getRandom({
    collectionIds: DEFAULT_COLLECTION_IDS,
    count: DEFAULT_COUNT,
  });

  if (images.errors) {
    return ctx.json({ error: 'Something went wrong!' }, 400);
  }

  let response = images.response;

  if (!Array.isArray(response)) {
    response = [response];
  }

  return ctx.json({ data: response });
});

export default app;
