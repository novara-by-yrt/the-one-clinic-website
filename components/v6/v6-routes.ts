/**
 * Routes that run the v6 magazine.
 *
 * The sections play out on a fixed stage rather than flowing down the
 * page, and the first of them is a full-bleed photograph. Shared chrome
 * that keys off "has the user scrolled yet?" would sit on its
 * top-of-page treatment, white text on a transparent bar, over whichever
 * section happens to be in front, including the paper ones.
 *
 * Same shape as v1-routes.ts, and used the same way: the Header imports
 * the predicate rather than testing a pathname itself.
 */
export const V6_ROUTES = new Set<string>(['/v6']);

export function isV6Route(pathname: string | null): boolean {
  return !!pathname && V6_ROUTES.has(pathname);
}
