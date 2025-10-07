"use server";
import bcrypt from "bcryptjs";
import {createPool } from "@vercel/postgres";
import { createSession } from "../token/login";

export const login = async ({usuario, contrasena}:{usuario: string, contrasena: string}) => {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        })
        
        const resBd = await pool.sql`SELECT contra, tipousuario from usuarios where usuario = ${usuario}`;
        const {rows} = resBd;
        await pool.end();
    
        const contraBd = rows[0].contra;
    
        const match = await bcrypt.compare(contrasena, contraBd);
    
        if (match) {
            const usuarioCompleto = `${usuario} ${rows[0].tipousuario}`;
            await createSession(usuarioCompleto);
            return true;
        }
        else return false;
        
    } catch (error) {
        console.error("Ocurrio un error al hacer login con la BD: ", error);
    }
}