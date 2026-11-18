import { useQuery } from '@tanstack/react-query'
import { obtenerParticipantes } from '../services/participantes'

export default function ListaParticipantes() {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['participantes'],
    queryFn: obtenerParticipantes,
  })

  if (isPending) {
    return (
      <p role="status" className="estado-mensaje">
        Cargando participantes…
      </p>
    )
  }

  if (isError) {
    return (
      <div role="alert" className="alerta-error">
        <p className="error-texto">Error al cargar participantes: {error.message}</p>
        <button type="button" className="boton-secundario" onClick={() => refetch()}>
          Reintentar
        </button>
      </div>
    )
  }

  if (data.length === 0) {
    return <p className="estado-mensaje">No hay participantes registrados todavía.</p>
  }

  // Valor derivado directamente en el render (sin estado redundante)
  const total = data.length

  return (
    <div>
      <p className="resumen-lista">
        Total registrados: <strong>{total}</strong>
        {isFetching && (
          <span role="status" className="estado-actualizando">
            {' '}
            · Actualizando…
          </span>
        )}
      </p>

      <ul className="lista-usuarios">
        {data.map((participante) => (
          <li key={participante.id} className="usuario-item">
            <div className="usuario-cabecera">
              <p className="usuario-nombre">{participante.nombre}</p>
              <span className="usuario-badge">{participante.rol}</span>
            </div>
            <p className="usuario-email">{participante.email}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
