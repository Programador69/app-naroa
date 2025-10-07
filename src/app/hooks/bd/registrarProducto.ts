"use server";
import { createPool } from "@vercel/postgres"

type Arg = {
    producto: string;
    imagen: string[];
    precio: number;
    talla: string;
    link: string;
    genero: string;
    coleccion: string;
}

export const registrarProducto = async (productoData: Arg) => {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        })
    
        const res = await pool.sql`INSERT INTO productos (nombre, genero, imagen, precio, talla, link_compra, coleccion) VALUES (${productoData.producto}, ${productoData.genero}, ${JSON.stringify(productoData.imagen)}, ${productoData.precio}, ${productoData.talla}, ${productoData.link}, ${productoData.coleccion})`;
        await pool.end();

        if (res) return true;
        else return false;
        
    } catch (error) {
        console.error("Ocurrio un error al querer registrar un producto en la BD: ", error);
    }
}