"use client";
import { Nav, Filtros, Articulos, Pie, Cargando } from "../componentes";
import { useState, useEffect } from "react";
import type { Articulos as ArticuloType } from "@/app/types/types";
import { obtenerArticulos } from "@/app/hooks";
import { QueryResultRow } from "@vercel/postgres";


export default function Home() {
  const [filtro, setFiltro] = useState({coleccion: "todas-las-colecciones", genero: "todos-los-generos"});
  const [busqueda, setBusqueda] = useState("");
  const [articulos, setArticulos] = useState(Array<ArticuloType>);
  const [cargando, setCargando] = useState(true);

  function mapRowsToProductos(rows: QueryResultRow[]): ArticuloType[] {
    return rows.map(row => ({
      id: Number(row.id),
      nombre: String(row.nombre),
      genero: String(row.genero),
      imagen: Array.isArray(row.imagen) ? row.imagen : [],
      precio: Number(row.precio),
      talla: String(row.talla),
      link_compra: String(row.link_compra),
      coleccion: String(row.coleccion),
    }));
  }

  useEffect(() => {
    // Llamar a la base de datos para obtener los productos
    const fetchArticulos = async () => {
      try {
        const data = await obtenerArticulos();

        if (data) setArticulos(mapRowsToProductos(data));
        else alert("Ocurrio un error al obtener los articulos por favor intenta mas tarde");

      }catch (error) {
        console.error("Error al obtener los artículos:", error);
      }finally {
        setCargando(false);
      }
    }

    fetchArticulos();
  }, []);

  return (
    <>
      <Nav/>

      <header className="hero">
        <h1>NAROA</h1>
        <h2>Tienda de ropa nueva y de segunda mano</h2>
      </header>

      <main className="contenedor">
        
        <Filtros filtro={filtro} setFiltro={setFiltro} setBusqueda={setBusqueda} />

        <div className="category-title">
          <h3>{filtro.coleccion.charAt(0).toUpperCase() + filtro.coleccion.slice(1,).replaceAll("-", " ")}, {filtro.genero.charAt(0).toUpperCase() + filtro.genero.slice(1,).replaceAll("-", " ")}</h3>
        </div>

        <section className="productos-grid">
          {
            cargando ? <Cargando /> :
            <Articulos busqueda={busqueda} articulos={articulos} admin={true} />
          }
        </section>


      </main>

      <Pie/>
    </>
  );
}
