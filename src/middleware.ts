import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // prosta kontrola, np. przekierowanie, sprawdzenie headera
    const token = request.cookies.get('token');
    // if (request.nextUrl.pathname.startsWith('/account/admin')) {
    //     return NextResponse.redirect(new URL('/account', request.url));
    // }
    if (!token || !token.value) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*', '/account/admin'], // ścieżki które chcesz chronić
};
