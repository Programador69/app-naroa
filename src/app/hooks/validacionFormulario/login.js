import { z } from 'zod';

export const formSchemaLogin = z.object({
  usuario: z.string().min(3, { error: 'Por favor, ingresa tu nombre de usuario' }),
  contrasena: z.string().min(8, { error: 'Por favor, ingresa tu contraseña' }),
});