"use server";
import {SignJWT, jwtVerify} from "jose";
import { cookies } from 'next/headers'

type SessionPayload = {
  user: string;
};


const claveSecreta = process.env.SECRET_KEY;
const encodeKey = new TextEncoder().encode(claveSecreta); 

export async function encriptar(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session: ', error)
  }
}
 
export async function createSession(user: string) {
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000)
  const session = await encriptar({ user })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}