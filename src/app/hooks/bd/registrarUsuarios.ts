"use server";
import { createPool } from "@vercel/postgres";
import bcrypt from "bcryptjs";

type Arg = {
    nombre: string;
    usuario: string;
    contrasena: string;
    tipoUsuario: "administrador" | "empleado";
}

export const registrarUsuario = async (datoUsuario: Arg) => {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        })

        const contraHasheada = await bcrypt.hash(datoUsuario.contrasena, 10);
    
        const res = await pool.sql`INSERT INTO usuarios (nombre, usuario, contrasena, tipousuario) VALUES (${datoUsuario.nombre}, ${datoUsuario.usuario}, ${contraHasheada}, ${datoUsuario.tipoUsuario})`;
        await pool.end();

        if (res) return true;
        else return false;
        
    } catch (error) {
        console.error("Ocurrio un error al registrar un nuevo usuario: ", error);
    }
}