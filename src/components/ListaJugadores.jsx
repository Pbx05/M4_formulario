import { useQuery } from '@tanstack/react-query'
import { obtenerJugadores } from '../services/jugadores'

export default function ListaJugadores() {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['jugadores'],
    queryFn: obtenerJugadores,
  })

  if (isPending) {
    return (
      <p role="status" className="estado-mensaje">
        Cargando jugadores…
      </p>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="alerta-error">
        <p className="error-texto">Error al cargar jugadores: {error.message}</p>
        <button type="button" className="boton-secundario" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    )
  }

  if (data.length === 0) {
    return <p className="estado-mensaje">No hay jugadores inscritos todavía.</p>
  }

  // Valor derivado directamente en el render (sin estado redundante)
  const total = data.length

  return (
    <div>
      <p className="resumen-lista">
        Jugadores inscritos: <strong>{total}</strong>
        {isFetching && (
          <span role="status" className="estado-actualizando">
            {' '}
            · Actualizando…
          </span>
        )}
      </p>

      <ul className="lista-usuarios">
        {data.map((jugador) => (
          <li key={jugador.id} className="usuario-item">
            <div className="usuario-cabecera">
              <p className="usuario-nombre">{jugador.nombre}</p>
              <span className="usuario-badge">{jugador.posicion}</span>
            </div>
            <p className="usuario-email">{jugador.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
