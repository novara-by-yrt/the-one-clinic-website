import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PRODUCTION_HOST = 'www.the-oneclinic.co.uk';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  // Any host that is not the bare production domain gets noindex headers
  if (host !== PRODUCTION_HOST) {
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
