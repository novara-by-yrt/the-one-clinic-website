/**
 * Routes that run the v4 magazine.
 *
 * The magazine is a horizontal track: the document itself has no
 * vertical scroll, so window.scrollY never leaves 0. Shared chrome that
 * keys off "has the user scrolled yet?" needs to know that, or it stays
 * on its top-of-page treatment for the whole route. The site Header's
 * top-of-page treatment is white text on a transparent bar, which is
 * invisible over the magazine's paper panels.
 *
 * Same shape as v1-routes.ts, and used the same way: the Header imports
 * the predicate rather than testing a pathname itself.
 */
export const V4_ROUTES = new Set<string>(['/v4']);

export function isV4Route(pathname: string | null): boolean {
  return !!pathname && V4_ROUTES.has(pathname);
}
