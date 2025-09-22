"use client";
import "./articulos.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Articulos as ArticuloType } from "@/app/types/types";
import { v4 as uuidv4 } from "uuid";
import { eliminarProducto } from "@/app/hooks";

// Al llamar los datos quiero que se muestren de forma aleatoria

export function Articulos ({busqueda, articulos, admin}: {busqueda: string, articulos: ArticuloType[], admin: boolean}) {
    const [articulosFiltrados, setArticulosFiltrados] = useState(articulos);

    useEffect(() => {
        if (busqueda === "") setArticulosFiltrados(articulos); 
        else setArticulosFiltrados( articulos.filter( articulo => articulo.nombre.toLowerCase().includes(busqueda.toLowerCase()) ) );

    }, [busqueda, articulos]);

    const eliminarArticulo = async(id: number) => {
        const res = await eliminarProducto(id);

        if (res) alert("Producto eliminado correctamente");
        else alert("Ocurrio un problema al eliminar el articulo, intenta más tarde o pide ayuda tecnica");
    }

    return (
        <>
            {
                articulosFiltrados.map( articulo => (
                    <section key={articulo.id} className={`articulo-compra producto-card ${articulo.coleccion} ${articulo.genero}`}>
                            <div className="contenedor">
                                <div className="carrusel" >
                                        {
                                            articulo.imagen.map(link => (
                                                <figure key={uuidv4()} className="producto-image">
                                                    <Image src={link} alt={`Imagen de ropa NAROA`} width={100} height={100} /> 
                                                </figure>
                                            ))
                                        }
                                    {
                                        articulo.imagen.length > 1 ? (
                                            <>
                                                <div className="multi-image-badge">
                                                    📸 <span className="image-count">{articulo.imagen.length} fotos</span>
                                                </div>
                                            </>
                                        ) : null
                                    }
                                </div>

                                <div className="producto-info">
                                    <h4>{articulo.nombre}</h4>
                                    <span className="producto-precio">{articulo.precio}</span>
                                    <a href={articulo.linkCompra} target="_BLANK" className="producto-link">Link de compra</a>
                                </div>
                                {
                                    admin ? <button className="botonEliminar" onClick={() => eliminarArticulo(articulo.id)}>Eliminar articulo</button> : null
                                }
                            </div>
                    </section>
                ))
            }
        </>
    )
}

// plantilla:

// return (
//         <section key={"id"}> -> esto ira dentro de un bucle para iterar los productos obtenidos por la bade de datos y la key sera el id del producto
//             <article className="roaCollection"> -> aca en la clase igual se pondra el nombre de la coleccion

//                 <div>
//                     <figure>
//                         <Image src="imagenes/roaCollection/calcetas.jpg" alt="Ropa de la tienda NAROA" /> -> Aca se pondra la url de la imagen
//                     </figure>
//                     <h4>Calcetas unitalla $150</h4> -> aca ira el nombre del producto y el precio
//                     <ul className="links">
//                         <li><a href="https://wa.me/p/6033288936728423/5219581248628" target="_BLANK">Link de compra</a></li> -> aca ira el link de compra del producto
//                     </ul>
//                 </div>
//             </article>
//         </section>
//     )