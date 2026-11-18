import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { esquemaRegistro } from '../schemas/participanteSchema'

export default function FormularioRegistro({
  onRegistrar,
  isPending = false,
  errorServidor = null,
  isSuccess = false,
}) {
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
      rol: '',
      password: '',
      repetirPassword: '',
      aceptaTerminos: false,
    },
  })

  async function onSubmit(datos) {
    if (onRegistrar) {
      await onRegistrar(datos)
      reset() // Limpia los campos tras completar el registro (sección 5 del temario)
    }
  }

  const bloqueado = isSubmitting || isPending

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Feedback de error del servidor */}
      {errorServidor && (
        <p role="alert" className="alerta-error">
          {errorServidor}
        </p>
      )}

      {/* Feedback de éxito accesible con role="status" (sección 4 del temario) */}
      {isSuccess && (
        <p role="status" className="ok">
          ¡Participante registrado con éxito!
        </p>
      )}

      {/* Campo: Nombre completo */}
      <div className="campo">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          placeholder="Ej. Ada Lovelace"
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
          placeholder="ada@ejemplo.com"
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
          placeholder="Mínimo 18 años"
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

      {/* Campo: Perfil técnico (select) */}
      <div className="campo">
        <label htmlFor="rol">Perfil técnico</label>
        <select
          id="rol"
          aria-invalid={!!errors.rol}
          aria-describedby={errors.rol ? 'error-rol' : undefined}
          {...register('rol')}
        >
          <option value="">-- Selecciona una especialidad --</option>
          <option value="Frontend">Frontend Developer</option>
          <option value="Backend">Backend Developer</option>
          <option value="Fullstack">Fullstack Developer</option>
          <option value="Mobile">Mobile Developer</option>
          <option value="DevOps">DevOps / Cloud Engineer</option>
        </select>
        {errors.rol && (
          <p id="error-rol" role="alert" className="error">
            {errors.rol.message}
          </p>
        )}
      </div>

      {/* Campo: Contraseña con dependencia cruzada */}
      <div className="campo">
        <label htmlFor="password">Contraseña</label>
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

      {/* Campo: Términos y condiciones (checkbox obligatorio) */}
      <div className="campo-checkbox">
        <input
          id="aceptaTerminos"
          type="checkbox"
          aria-invalid={!!errors.aceptaTerminos}
          aria-describedby={errors.aceptaTerminos ? 'error-aceptaTerminos' : undefined}
          {...register('aceptaTerminos')}
        />
        <label htmlFor="aceptaTerminos">
          Acepto los términos del evento y la política de privacidad
        </label>
      </div>
      {errors.aceptaTerminos && (
        <p id="error-aceptaTerminos" role="alert" className="error">
          {errors.aceptaTerminos.message}
        </p>
      )}

      {/* Botón de envío deshabilitado durante el envío para evitar dobles envíos */}
      <button type="submit" disabled={bloqueado}>
        {bloqueado ? 'Registrando participante…' : 'Completar registro'}
      </button>
    </form>
  )
}

