// TODO: REALIZAR EL BACKEND
"use client";
import "./page.css";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { formSchema, registrarProducto } from "../hooks";
import { z } from "zod";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function RegistroProductos() {
    const [imagenes, setImagenes] = useState(Array<string>());

    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const res = await registrarProducto({...data, imagen: imagenes});
        setImagenes([]);
        if (res) alert("Articulo registrado exitosamente!");
        else alert("No se pudo registrar el articulo, intentelo más tarde o pida ayuda tecnica.");
        // console.log({...data, imagen: imagenes});
    };

    return (
        <div className="container">
        <h1>Registro de Productos</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre del producto:</label>
                <input type="text" id="nombre" placeholder="Ingresa el nombre del producto" {...register('producto')} />
                {errors.producto && <span>{errors.producto.message}</span>}
            </div>

            <div className="form-group">
                <label>Imagen del producto:</label>
                <CldUploadWidget options={{resourceType: "image",clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"]}} uploadPreset="app-naroa" onSuccess={(res) => {
                    if (typeof res.info === "object" && "secure_url" in res.info) {
                        setImagenes([...imagenes, (res.info as { secure_url: string }).secure_url]);
                    }
                }} >
                    {({open}) => {
                        return <button className="btn-imagen" onClick={() => open()}>Sube aqui las imagenes</button>
                    }}
                </CldUploadWidget>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="precio">Precio en MXN:</label>
                    <input type="number" id="precio" {...register('precio', { valueAsNumber: true })} placeholder="0.00" step="0.01" min="0" />
                    {errors.precio && <span>{errors.precio.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="talla">Talla:</label>
                    <input type="text" id="talla" {...register('talla')} placeholder="S, M, L, XL..." />
                    {errors.talla && <span>{errors.talla.message}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="linkCompra">Link de compra:</label>
                <input type="text" id="linkCompra" {...register('link')} placeholder="https://..." />
                {errors.link && <span>{errors.link.message}</span>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="genero">Género:</label>
                    <select id="genero" {...register('genero')}>
                        <option value="">Selecciona género</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                        <option value="unisex">Unisex</option>
                    </select>
                    {errors.genero && <span>{errors.genero.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="coleccion">Colección:</label>
                    <select id="coleccion" {...register('coleccion')}>
                        <option value="">Selecciona colección</option>
                        <option value="roa-coleccion">Roa coleccion</option>
                        <option value="my-closet-coleccion">My Closet coleccion</option>
                        <option value="demin-coleccion">Denim coleccion</option>
                        <option value="kini-coleccion">Kini coleccion</option>
                    </select>
                    {errors.coleccion && <span>{errors.coleccion.message}</span>}
                </div>
            </div>

            <button type="submit" className="submit-btn">Registrar Producto</button>
        </form>
    </div>
    )
}