import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/lib/constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Get the auth state from the cookie
  const authCookie = request.cookies.get('gemini-chat-auth');
  let isAuthenticated = false;

  try {
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      isAuthenticated = authData?.state?.isAuthenticated || false;
    }
  } catch (error) {
    console.error('Error parsing auth cookie:', error);
  }

  // Define auth and protected paths
  const isAuthPage = path.startsWith(ROUTES.AUTH);
  const isProtectedPath = [ROUTES.DASHBOARD, ROUTES.CHAT].some(route => path.startsWith(route));

  // Redirect authenticated users trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL(ROUTES.AUTH, request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico)).*)',
  ],
}; 