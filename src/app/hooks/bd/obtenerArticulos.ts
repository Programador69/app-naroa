// IMPORTANTE -> genero y coleccion tienen que estar en minusculas y sin espacios, si se quierer cambiar debe cambiartse tambien en el use state inicial del home y en los select de la pagina de filtrados
"use server";
import { createPool } from "@vercel/postgres";

export async function obtenerArticulos() {
    try {
        const pool = createPool({
            connectionString: process.env.DATABASE_URL
        })

        const productos = await pool.sql`SELECT * FROM productos`;
        await pool.end();

        if (productos) return productos.rows;
        else return false;

    } catch (error) {
        console.error("Ocurrio un error al obtener los productos de la BD: ", error);
    }

}

// export function ObtenerArticulos() {
//     return [
//         {
//             id: 1,
//             nombre: "Vestido rosa",
//             genero: "mujer",
//             imagen: ["/next.svg", "/next.svg"],
//             precio: 450,
//             talla: "S",
//             linkCompra: "https://www.google.com",
//             coleccion: "roa-collection"
//         },
//         {
//             id: 2,
//             nombre: "Camisa azul",
//             genero: "hombre",
//             imagen: ["/next.svg"],
//             precio: 300,
//             talla: "M",
//             linkCompra: "https://www.google.com",
//             coleccion: "my-closet-collection"
//         },
//         {
//             id: 3,
//             nombre: "Pantalones",
//             genero: "unisex",
//             imagen: ["/next.svg", "/next.svg", "/next.svg"],
//             precio: 600,
//             talla: "L",
//             linkCompra: "https://www.google.com",
//             coleccion: "demin-collection"
//         },
//     ];
// }