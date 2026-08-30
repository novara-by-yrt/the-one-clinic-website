/**
 * Routes that run the v1 concept shell: their own header, and a footer in
 * normal document flow rather than the fixed reveal used elsewhere.
 *
 * Shared by LayoutShell (footer mode + the footer-visible flag) and Header
 * (which stands down so V1Header can take over), so the two can never
 * disagree about which routes are v1.
 */
export const V1_ROUTES = new Set<string>(['/v1']);

export function isV1Route(pathname: string | null): boolean {
  return !!pathname && V1_ROUTES.has(pathname);
}
