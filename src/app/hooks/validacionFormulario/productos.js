// formSchema.js
import { z } from 'zod';

export const formSchema = z.object({
  producto: z.string().min(1, { error: 'Por favor, ingresa el nombre del producto' }),
  imagen: z.any(), // La validación de archivos es manual
  precio: z.coerce.number({ invalid_type_error: 'Por favor, ingresa un precio válido' }).min(0, { error: 'El precio no puede ser negativo' }),
  talla: z.string().min(1, { error: 'Por favor, ingresa la talla del producto' }),
  link: z.url({ error: 'Por favor, ingresa un enlace válido' }),
  genero: z.string().min(1, { error: 'Por favor, selecciona el género' }),
  coleccion: z.string().min(1, { error: 'Por favor, selecciona la colección' }),
});