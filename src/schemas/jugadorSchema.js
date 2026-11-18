import { z } from 'zod'

// Esquema de validación para el formulario de inscripción (única fuente de verdad)
export const esquemaRegistro = z
  .object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.email('Introduce un correo electrónico válido'),
    edad: z.coerce
      .number()
      .int('La edad debe ser un número entero')
      .min(16, 'La edad mínima para participar es de 16 años')
      .max(65, 'La edad máxima permitida es de 65 años'),
    posicion: z.string().min(1, 'Debes seleccionar una posición en el campo'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    repetirPassword: z.string(),
    aceptaReglamento: z.literal(true, {
      error: 'Debes aceptar el reglamento del torneo',
    }),
  })
  .refine((datos) => datos.password === datos.repetirPassword, {
    error: 'Las contraseñas no coinciden',
    path: ['repetirPassword'], // Asigna el error al campo repetirPassword
  })

// Esquema para validar los datos que devuelve la API (sección 11 del temario)
export const esquemaJugador = z.object({
  id: z.number(),
  nombre: z.string(),
  email: z.string(),
  posicion: z.string(),
})

export const esquemaListaJugadores = z.array(esquemaJugador)
