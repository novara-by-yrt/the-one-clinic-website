/**
 * Routes whose footer sits in normal document flow and scrolls with the
 * page, instead of the fixed reveal used everywhere else.
 *
 * Kept separate from V1_ROUTES on purpose. That set answers a different
 * question ("does this route run the v1 chrome, so the site Header
 * stands down for V1Header?"), and the two answers differ: /v2, /v3 and
 * /v4 want the normal footer but keep the site Header, and adding them
 * to V1_ROUTES would leave those pages with no navigation at all.
 *
 * Below 1024px LayoutShell's stylesheet forces flow for every route
 * regardless, because a footer taller than the viewport cannot be
 * revealed by a fixed layer. This set is what opts a route in at
 * desktop widths too.
 */
export const FLOW_FOOTER_ROUTES = new Set<string>(['/v1', '/v2', '/v3', '/v4']);

export function usesFlowFooter(pathname: string | null): boolean {
  return !!pathname && FLOW_FOOTER_ROUTES.has(pathname);
}
