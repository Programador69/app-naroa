"use client";
import "./page.css";
import { formSchemaLogin, login } from "../hooks";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

export default function Login() {
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(formSchemaLogin),
    });
    
    const onSubmit = async (data: z.infer<typeof formSchemaLogin>) => {
        const res = await login(data);

        if (!res) alert("Usuario / contraseña incorrectos");
        else {
            redirect("/productosAdmin")
        }
    };

    return (
        <div className="login-container">
        <h1 className="login-title">Inicio de Sesión</h1>
        <div className="login-subtitle"></div>
        
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                <input 
                    type="text" 
                    id="username" 
                    {...register("usuario")}
                    className="form-input" 
                    placeholder="Ingresa tu nombre de usuario"
                    required
                />
                <div className="error-message" id="usernameError">
                    {errors.usuario && <span>{errors.usuario.message}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input 
                    type="password" 
                    id="password" 
                    {...register("contrasena")}
                    className="form-input" 
                    placeholder="Ingresa tu contraseña"
                    required
                />
                <div className="error-message" id="passwordError">
                    {errors.contrasena && <span>{errors.contrasena.message}</span>}
                </div>
            </div>

            <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>

        <div className="forgot-password">
            <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
    </div>
    )
}