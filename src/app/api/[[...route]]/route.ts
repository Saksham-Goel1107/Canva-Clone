import { type AuthConfig, initAuthConfig } from '@hono/auth-js';
import { type Context, Hono } from 'hono';
import { handle } from 'hono/vercel';

import authConfig from '@/auth.config';

import ai from './ai';
import images from './images';
import projects from './projects';
import subscriptions from './subscriptions';
import users from './users';

export const runtime = 'nodejs';

const getAuthConfig = (ctx: Context): AuthConfig => {
  return {
    secret: process.env.AUTH_SECRET,
    ...authConfig,
  };
};

const app = new Hono().basePath('/api');

app.use('*', initAuthConfig(getAuthConfig));

const routes = app
  .route('/ai', ai)
  .route('/images', images)
  .route('/projects', projects)
  .route('/subscriptions', subscriptions)
  .route('/users', users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
