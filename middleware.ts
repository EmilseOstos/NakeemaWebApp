import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/session';

const normalizar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  const publicPaths = ['/', '/registro', '/recuperar'];

  if (publicPaths.includes(pathname)) {
    if (sessionCookie) {
      const user = await verifySessionToken(sessionCookie);
      if (user) {
        const dashboard = `/dashboard/${normalizar(user.rol) === 'administrador' ? 'admin' : normalizar(user.rol) === 'tecnico' ? 'tecnico' : 'cliente'}`;
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

    if (pathname.startsWith('/dashboard/admin') && normalizar(user.rol) !== 'administrador') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/dashboard/tecnico') && normalizar(user.rol) !== 'tecnico') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/dashboard/cliente') && normalizar(user.rol) !== 'cliente') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
