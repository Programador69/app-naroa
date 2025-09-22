import { z } from 'zod';

export const formSchemaRegistroUsuarios = z.object({
  nombre: z.string().min(10, { error: 'Por favor, ingresa el nombre completo' }),
  usuario: z.string().min(3, { error: 'Por favor, ingresa tu nombre de usuario' }),
  contrasena: z.string().min(8, { error: 'Por favor, ingresa tu contraseña' }),
  verificarContrasena: z.string().min(8, { error: 'Por favor, verifica tu contraseña' }),
  tipoUsuario: z.enum(['administrador', 'empleado'], { error: 'Por favor, selecciona un tipo de usuario' }),
});