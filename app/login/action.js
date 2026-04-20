'use server'

import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { redirect } from "next/navigation";

export async function login(prevState, formData){
    const secretKey = new TextEncoder().encode(process.env.JOSE_SECRET);
    console.log('action: ', process.env.JOSE_SECRET);
    const token = await new SignJWT({ email: "norrapron@gmail.com"})
                .setProtectedHeader({ alg: 'HS256'})
                .setIssuedAt()
                .setExpirationTime('1h')
                .sign(secretKey)

    const cookiesStore = await cookies();
    cookiesStore.set('token', token)

    redirect('/manage/book')
}