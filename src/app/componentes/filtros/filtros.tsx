"useClient";
import { useState, useEffect } from "react";
import { cambioArticulos, buscarProducto } from "@/app/hooks";
import { Filtro, SetFiltro, SetBusqueda, EventoChange } from "@/app/types/types";

export function Filtros ({filtro, setFiltro, setBusqueda}: {filtro: Filtro, setFiltro: SetFiltro, setBusqueda: SetBusqueda}) {
    const [nuevoFiltro, setNuevoFiltro] = useState(filtro);

    const actualizarFiltro = (e: EventoChange, parametro: "coleccion" | "genero") => {
        const valor = e.target.value;
        setFiltro(prevFiltro => ({...prevFiltro, [parametro]: valor}));
        setNuevoFiltro(prevFiltro => ({...prevFiltro, [parametro]: valor}));
    }

    useEffect(() => {
        cambioArticulos(nuevoFiltro);
    }, [nuevoFiltro])

    return (
        <section className="filtros">
          <select className="select" onChange={(e) => actualizarFiltro(e, "coleccion")}>
            <option value="todas-las-colecciones">Todas las colecciones</option>
            <option value="roa-collection">Roa Collection</option>
            <option value="my-closet-collection">My Closet Collection</option>
            <option value="demin-collection">Demin Collection</option>
            <option value="kini-collection">Kini Collection</option>
          </select>

          <select className="select" onChange={(e) => actualizarFiltro(e, "genero")}>
            <option value="todos-los-generos">Todos los generos</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="unisex">Unisex</option>
          </select>

          <input type="text" className="buscador" placeholder="Busca un producto" onChange={(e) => buscarProducto(e,setBusqueda)} />
        </section>
    )
}