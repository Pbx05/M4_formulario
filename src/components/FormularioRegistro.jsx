import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { esquemaRegistro } from '../schemas/jugadorSchema'
import { crearJugador } from '../services/jugadores'

export default function FormularioRegistro() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      nombre: '',
      email: '',
      edad: '',
      posicion: '',
      password: '',
      repetirPassword: '',
      aceptaReglamento: false,
    },
  })

  const mutacion = useMutation({
    mutationFn: crearJugador,
    onSuccess: () => {
      reset() // Limpia el formulario tras completar la inscripción
      // Invalidamos la query para refrescar la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ['jugadores'] })
    },
  })

  function onSubmit(datos) {
    mutacion.mutate(datos)
  }

  const bloqueado = isSubmitting || mutacion.isPending

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Feedback de error global / servidor con role="alert" */}
      {mutacion.isError && (
        <p role="alert" className="alerta-error">
          {mutacion.error.message}
        </p>
      )}

      {/* Feedback de éxito accesible con role="status" */}
      {mutacion.isSuccess && (
        <p role="status" className="ok">
          ¡Jugador inscrito en el torneo con éxito!
        </p>
      )}

      {/* Campo: Nombre completo */}
      <div className="campo">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          placeholder="Ej. Iker Casillas"
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? 'error-nombre' : undefined}
          {...register('nombre')}
        />
        {errors.nombre && (
          <p id="error-nombre" role="alert" className="error">
            {errors.nombre.message}
          </p>
        )}
      </div>

      {/* Campo: Correo electrónico */}
      <div className="campo">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="jugador@ejemplo.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-email' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="error-email" role="alert" className="error">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Campo: Edad (numérico con z.coerce.number) */}
      <div className="campo">
        <label htmlFor="edad">Edad</label>
        <input
          id="edad"
          type="number"
          min="0"
          placeholder="Entre 16 y 65 años"
          aria-invalid={!!errors.edad}
          aria-describedby={errors.edad ? 'error-edad' : undefined}
          {...register('edad')}
        />
        {errors.edad && (
          <p id="error-edad" role="alert" className="error">
            {errors.edad.message}
          </p>
        )}
      </div>

      {/* Campo: Posición en el campo (select) */}
      <div className="campo">
        <label htmlFor="posicion">Posición</label>
        <select
          id="posicion"
          aria-invalid={!!errors.posicion}
          aria-describedby={errors.posicion ? 'error-posicion' : undefined}
          {...register('posicion')}
        >
          <option value="">-- Selecciona una posición --</option>
          <option value="Portero">Portero</option>
          <option value="Defensa">Defensa</option>
          <option value="Centrocampista">Centrocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
        {errors.posicion && (
          <p id="error-posicion" role="alert" className="error">
            {errors.posicion.message}
          </p>
        )}
      </div>

      {/* Campo: Contraseña con dependencia cruzada */}
      <div className="campo">
        <label htmlFor="password">Contraseña de acceso</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'error-password' : undefined}
          {...register('password', { deps: ['repetirPassword'] })}
        />
        {errors.password && (
          <p id="error-password" role="alert" className="error">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Campo: Confirmar contraseña */}
      <div className="campo">
        <label htmlFor="repetirPassword">Confirmar contraseña</label>
        <input
          id="repetirPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.repetirPassword}
          aria-describedby={errors.repetirPassword ? 'error-repetirPassword' : undefined}
          {...register('repetirPassword')}
        />
        {errors.repetirPassword && (
          <p id="error-repetirPassword" role="alert" className="error">
            {errors.repetirPassword.message}
          </p>
        )}
      </div>

      {/* Campo: Reglamento del torneo (checkbox obligatorio) */}
      <div className="campo-checkbox">
        <input
          id="aceptaReglamento"
          type="checkbox"
          aria-invalid={!!errors.aceptaReglamento}
          aria-describedby={errors.aceptaReglamento ? 'error-aceptaReglamento' : undefined}
          {...register('aceptaReglamento')}
        />
        <label htmlFor="aceptaReglamento">
          Acepto el reglamento oficial del torneo de fútbol
        </label>
      </div>
      {errors.aceptaReglamento && (
        <p id="error-aceptaReglamento" role="alert" className="error">
          {errors.aceptaReglamento.message}
        </p>
      )}

      {/* Botón de envío deshabilitado durante el envío para evitar dobles envíos */}
      <button type="submit" disabled={bloqueado}>
        {bloqueado ? 'Inscribiendo jugador…' : 'Inscribirse en el torneo'}
      </button>
    </form>
  )
}
