/**
 * Routes that run the v1 concept chrome: their own header instead of the
 * site one.
 *
 * Shared by Header (which stands down) and V1Header (which takes over),
 * so the two can never disagree about which routes are v1.
 *
 * Footer mode is a separate question and lives in
 * components/layout/footer-mode.ts: v1 uses the normal-flow footer, but
 * so does v2, which keeps the site Header.
 */
export const V1_ROUTES = new Set<string>(['/v1']);

export function isV1Route(pathname: string | null): boolean {
  return !!pathname && V1_ROUTES.has(pathname);
}
