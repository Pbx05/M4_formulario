import { useQuery } from '@tanstack/react-query'
import { obtenerParticipantes } from '../services/participantes'

export default function ListaParticipantes() {
  const { data, isPending, isError, error, isFetching } = useQuery({
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
      <p role="alert" className="alerta-error">
        Error al cargar participantes: {error.message}
      </p>
    )
  }

  if (data.length === 0) {
    return <p className="estado-mensaje">No hay participantes registrados todavía.</p>
  }

  return (
    <div>
      {isFetching && (
        <p role="status" className="estado-mensaje">
          Actualizando listado…
        </p>
      )}

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

