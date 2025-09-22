"use client";
import "./page.css";
import { formSchemaRegistroUsuarios, registrarUsuario } from "../hooks";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { deleteSession } from "../hooks/token/login";
import { redirect } from "next/navigation";

export default function RegistroUsuarios() {
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(formSchemaRegistroUsuarios),
    });
        
    const onSubmit = async (data: z.infer<typeof formSchemaRegistroUsuarios>) => {
        if (data.contrasena !== data.verificarContrasena) {
            alert("Las contraseñas no coinciden");
        }
        else {
            const res = await registrarUsuario(data);
            if (res) alert("Usuario registrado con exito");
            else alert("No se pudo registrar el usuario, vuelva a intentarlo o solicita ayuda tecnica");
        }
    };

    const cerrarSesion = async() => {
        try {
            await deleteSession();
            redirect("/");

        } catch (error) {
            console.error("Ocurrio un error al cerrar sesion: ", error);
        }
    }

    return (
        <div className="register-container">
        <h1 className="register-title">Registro de Usuario</h1>
        <div className="register-subtitle"></div>
        
        <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="fullName" className="form-label">Nombre completo:</label>
                <input 
                    type="text" 
                    id="fullName" 
                    {...register("nombre")} 
                    className="form-input" 
                    placeholder="Ingresa tu nombre completo"
                    required
                />
                <div className="error-message" id="fullNameError">
                    {errors.nombre && <span>{errors.nombre.message}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                <input 
                    type="text" 
                    id="username" 
                    {...register("usuario")} 
                    className="form-input" 
                    placeholder="Ingresa tu nombre de usuario"
                    required
                    minLength={3}
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
                    minLength={6}
                />
                <div className="error-message" id="passwordError">
                    {errors.contrasena && <span>{errors.contrasena.message}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña:</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    {...register("verificarContrasena")}
                    className="form-input" 
                    placeholder="Confirma tu contraseña"
                    required
                />
                <div className="error-message" id="confirmPasswordError">
                    {errors.verificarContrasena && <span>{errors.verificarContrasena.message}</span>}
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="role" className="form-label">Tipo de usuario:</label>
                <select id="role" {...register("tipoUsuario")} className="form-select" required>
                    <option value="">Selecciona el tipo de usuario</option>
                    <option value="empleado">Empleado</option>
                    <option value="administrador">Administrador</option>
                </select>
                <div className="role-indicator" id="roleIndicator"></div>
                <div className="error-message" id="roleError">
                    {errors.tipoUsuario && <span>{errors.tipoUsuario.message}</span>}
                </div>
            </div>

            <button type="submit" className="register-button">Registrar Usuario</button>
        </form>

        <button className="botonCerrarSesion" onClick={cerrarSesion} >Cerrar sesión</button>
    </div>
    )
}