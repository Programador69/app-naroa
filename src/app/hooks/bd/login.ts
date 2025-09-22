"use server";
import bcrypt from "bcryptjs";
import {createPool } from "@vercel/postgres";
import { createSession } from "../token/login";

export const login = async ({usuario, contrasena}:{usuario: string, contrasena: string}) => {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        })
        
        const resBd = await pool.sql`SELECT contra from usuarios where usuario = ${usuario}`;
        const {rows} = resBd;
        await pool.end();
    
        const contraBd = rows[0].contra;
    
        const match = await bcrypt.compare(contrasena, contraBd);
    
        if (match) {
            await createSession(usuario);
            return true;
        }
        else return false;
        
    } catch (error) {
        console.error("Ocurrio un error al hacer login con la BD: ", error);
    }
}