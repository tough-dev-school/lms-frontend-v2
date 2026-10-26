import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import app from './index';

// The production server. In dev, @hono/vite-dev-server runs ./index.ts inside Vite instead.
const PORT = Number(process.env.PORT ?? 3000);
const CLIENT_DIR = new URL('../client', import.meta.url).pathname;

const main = new Hono()
  // Hashed file names change on every build, so the browser may keep them forever
  .use(
    '/assets/*',
    serveStatic({
      root: CLIENT_DIR,
      onFound: (_path, c) => {
        c.header('Cache-Control', 'public, max-age=31536000, immutable');
      },
    }),
  )
  // A chunk from an older build is gone, a 404 lets the client reload instead of parsing a login page as JS
  .all('/assets/*', (c) => c.notFound())
  // The build manifest is for the server only
  .all('/.vite/*', (c) => c.notFound())
  .use('*', serveStatic({ root: CLIENT_DIR }))
  .route('/', app);

serve({ fetch: main.fetch, port: PORT }, ({ port }) => {
  // Startup goes to stderr with the other server logs
  console.warn(`Listening on http://localhost:${port}`);
});
