import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  const publicPaths = ['/', '/registro', '/recuperar'];

  if (publicPaths.includes(pathname)) {
    if (sessionCookie) {
      const user = await verifySessionToken(sessionCookie);
      if (user) {
        const dashboard = `/dashboard/${user.rol === 'Administrador' ? 'admin' : user.rol === 'Técnico' ? 'tecnico' : 'cliente'}`;
        return NextResponse.redirect(new URL(dashboard, request.url));
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const user = await verifySessionToken(sessionCookie);
    if (!user) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && user.rol !== 'Administrador') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/dashboard/tecnico') && user.rol !== 'Técnico') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/dashboard/cliente') && user.rol !== 'Cliente') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
