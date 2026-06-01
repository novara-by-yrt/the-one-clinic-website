import { NextResponse } from 'next/server';

// Hide only preview/staging deployments from crawlers. Gate on the
// environment (matching robots.ts and next.config.ts) instead of the
// per-request Host header: a Host that failed to match — proxied/rewritten,
// an internal alias — used to stamp X-Robots-Tag: noindex onto production
// responses and de-index real pages. Environment gating cannot misfire on
// production traffic.
const isPreview =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_ENV === 'preview';

export function proxy() {
  if (isPreview) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  // Run on all routes; skip Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
