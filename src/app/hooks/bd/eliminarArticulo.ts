"use server";
import { createPool } from "@vercel/postgres";

export async function eliminarProducto(id: number) {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        });
    
        const res = await pool.sql`DELETE FROM productos where id = ${id}`;
        await pool.end();
    
        if (res) return true;
        else return false;
        
    } catch (error) {
        console.error("Ocurrio un error al querer eliminar un producto: ", error);
    }
}