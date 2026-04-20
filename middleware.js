import { jwtVerify } from "jose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export default async function middleware(request){
    try{
        const secretKey = new TextEncoder().encode(process.env.JOSE_SECRET);
        console.log('middleware: ', process.env.JOSE_SECRET);

        const token = request.cookies.get('token')?.value
        console.log(token)

        const { payload } = await jwtVerify(token, secretKey)
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user', JSON.stringify({ email: payload.email }))

        if(payload.email !== "norrapron@gmail.com"){
            throw new Error("email incorrect");
        }

        console.log(payload)

        const response = NextResponse.next({
            headers: requestHeaders,
        })
        return response;
    }catch(error){
        console.log('error', error)
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: '/manage/book/:path*',
}