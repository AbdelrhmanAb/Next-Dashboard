import { TPayloadToken } from '@/utils/types';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const getSecret = (): string => {
    const secret = process.env.SECRET_KEY

    if (!secret) {
        throw Error("CAN'T FOUND THE SECRET KEY ")
    }
    return secret
}




export const signToken = (payload: TPayloadToken): string => {

    return jwt.sign(payload, getSecret())
}


export const verifyToken = <T>(token: string): T => {

    return jwt.verify(token, getSecret()) as T

}

export const setCookie = async (payload: TPayloadToken) => {

    const token = signToken(payload)
    const cookieStore = await cookies()

    cookieStore.set('jwtToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        path: '/'

    })


    const cookie = cookieStore.get("jwtToken");
    console.log(cookie?.value);
    

    return cookie?.value

}

