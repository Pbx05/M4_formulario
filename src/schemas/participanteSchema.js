import { z } from 'zod'

// Esquema de validación para el formulario (única fuente de verdad)
export const esquemaRegistro = z
  .object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.email('Introduce un correo electrónico válido'),
    edad: z.coerce
      .number()
      .int('La edad debe ser un número entero')
      .min(18, 'Debes ser mayor de edad (mínimo 18 años)'),
    rol: z.string().min(1, 'Debes seleccionar un perfil técnico'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    repetirPassword: z.string(),
    aceptaTerminos: z.literal(true, {
      error: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine((datos) => datos.password === datos.repetirPassword, {
    error: 'Las contraseñas no coinciden',
    path: ['repetirPassword'], // Asigna el error al campo repetirPassword
  })

// Esquema para validar los datos que devuelve la API (sección 11 del temario)
export const esquemaParticipante = z.object({
  id: z.number(),
  nombre: z.string(),
  email: z.string(),
  rol: z.string(),
})

export const esquemaListaParticipantes = z.array(esquemaParticipante)

