import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    console.log("User navigated to " + request.url)
    return NextResponse.next();
}


export const config = {
    matcher: '/account/admin/:path*',
}