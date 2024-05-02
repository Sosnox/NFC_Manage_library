// // pages/_middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// const secret = process.env.NEXT_PUBLIC_JWT_SECRET;  // Ensure your JWT secret is correctly configured

// export async function middleware(req: NextRequest) {
//     const token = req.cookies.get('token');
//     if (token) {
//         try {
//             const { payload } = await jwtVerify(new TextEncoder().encode(token.toString()), new TextEncoder().encode(secret?.toString() ?? ''));
//             const role = payload.role as string;
//             req.nextUrl.searchParams.set('roles', role);
//             console.log(`Rewriting URL with role: ${role}`);
//             return NextResponse.rewrite(req.nextUrl);
//         } catch (error) {
//             console.error('Failed to verify JWT', error);
//         }
//     }

//     return NextResponse.next();
// }
