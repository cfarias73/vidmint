import { createCsrfMiddleware, createStart } from '@tanstack/react-start';
import { loggerMiddleware } from '@/functions/middleware';
import { openStoryErrorSerializationAdapter } from '@/lib/errors';
import { isAllowedCsrfFetchSite } from '@/lib/auth/csrf-origin';

/**
 * Custom `src/start.ts` disables TanStack Start's default CSRF install.
 * Re-register it on server functions only: `/api/*` (webhooks, public API,
 * Better Auth) must still accept cross-origin callers.
 *
 * `failureResponse` is a factory: `new Response(...)` at module scope is
 * I/O on Workers and 500s every request (including `/api/test/*`).
 * `Content-Type` is set so a rejected RPC throws the body instead of
 * Start's missing-header invariant on the client.
 */
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === 'serverFn',
  // Sec-Fetch-Site can be classified as same-site behind a proxy even when
  // the POST's Origin is the exact app origin. Accept that case only when the
  // Origin proves same-origin; requests from sibling subdomains still fail.
  secFetchSite: (site, ctx) => isAllowedCsrfFetchSite(site, ctx.request),
  failureResponse: () =>
    new Response('Forbidden: request origin could not be verified', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }),
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
  functionMiddleware: [loggerMiddleware],
  serializationAdapters: [openStoryErrorSerializationAdapter],
}));
