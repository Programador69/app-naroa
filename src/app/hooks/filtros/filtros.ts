"use client";
import type { SetBusqueda, Filtro, EventoInput } from "@/app/types/types";

export function cambioArticulos (nuevoFiltro: Filtro) {
    const colecciones = document.querySelectorAll(".articulo-compra");
    
    colecciones.forEach((coleccion) => {
        
        if ((coleccion.classList.contains(nuevoFiltro.genero) || nuevoFiltro.genero == "todos-los-generos") && (coleccion.classList.contains(nuevoFiltro.coleccion) || nuevoFiltro.coleccion == "todas-las-colecciones")) {
          (coleccion as HTMLElement).style.display = "block";
        } 
        else (coleccion as HTMLElement).style.display = "none";
    });
}

export function buscarProducto (e: EventoInput, setBusqueda: SetBusqueda) {
    const valor = e.target.value;
    setBusqueda(valor);
}