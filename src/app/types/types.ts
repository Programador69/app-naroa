import { Dispatch, SetStateAction } from "react";

export type Articulos = {
    id: number;
    nombre: string;
    genero: string;
    imagen: string[];
    precio: number;
    talla: string;
    link_compra: string;
    coleccion: string;
}

export type Filtro = {
    coleccion: string, 
    genero: string
}

export type SetFiltro = React.Dispatch<React.SetStateAction<{coleccion: string; genero: string;}>>

export type SetBusqueda = Dispatch<SetStateAction<string>>;

export type EventoChange = React.ChangeEvent<HTMLSelectElement>;

export type EventoInput = React.ChangeEvent<HTMLInputElement>;