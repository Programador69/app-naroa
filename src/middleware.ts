// crear el middleware para cubrir las rutas
import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "./app/hooks/token/login";

export async function middleware(req: NextRequest) {
    const cookie = req.cookies;

    const sesionCookie = cookie.get("session");
    const sesion = sesionCookie?.value;

    const esValida = await decrypt(sesion); 

    if (esValida) return NextResponse.next()
    else return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ['/productosAdmin', '/registroProductos', '/registroUsuarios']
}