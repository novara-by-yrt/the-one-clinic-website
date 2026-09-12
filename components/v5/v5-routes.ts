/**
 * Routes that run the v5 magazine.
 *
 * The deck opens on a card floating on a dark stage rather than on a
 * full-bleed section, so shared chrome that keys off "has the user
 * scrolled yet?" has nothing sensible to draw over. The site Header's
 * top-of-page treatment is white text on a transparent bar, which would
 * sit half over the stage and half over a paper card.
 *
 * Same shape as v1-routes.ts, and used the same way: the Header imports
 * the predicate rather than testing a pathname itself.
 */
export const V5_ROUTES = new Set<string>(['/v5']);

export function isV5Route(pathname: string | null): boolean {
  return !!pathname && V5_ROUTES.has(pathname);
}
