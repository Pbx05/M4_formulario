import { esquemaListaParticipantes } from '../schemas/participanteSchema'

const API_URL = import.meta.env.VITE_API_URL

// Ayudantes para persistir temporalmente las altas locales simuladas
function obtenerLocales() {
  try {
    const guardados = localStorage.getItem('participantes_registrados')
    return guardados ? JSON.parse(guardados) : []
  } catch {
    return []
  }
}

function guardarLocal(nuevo) {
  try {
    const actuales = obtenerLocales()
    const actualizados = [nuevo, ...actuales]
    localStorage.setItem('participantes_registrados', JSON.stringify(actualizados))
  } catch {
    // Si localStorage falla, la petición continúa
  }
}

// 1. Obtener participantes desde la API remota (GET)
export async function obtenerParticipantes() {
  const respuesta = await fetch(`${API_URL}/users`)

  // fetch no rechaza la promesa en 4xx/5xx: comprobamos respuesta.ok
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
  }

  const json = await respuesta.json()

  // Adaptamos los primeros 5 datos remotos de JSONPlaceholder
  const remotos = json.slice(0, 5).map((u) => ({
    id: u.id,
    nombre: u.name,
    email: u.email,
    rol: 'Desarrollador',
  }))

  // Unimos los creados localmente con los remotos
  const locales = obtenerLocales()
  const todos = [...locales, ...remotos]

  // Validamos la respuesta completa con el esquema Zod (punto 11 del temario)
  return esquemaListaParticipantes.parse(todos)
}

// 2. Registrar nuevo participante en la API remota (POST)
export async function crearParticipante(datos) {
  const respuesta = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo registrar el participante en el servidor')
  }

  await respuesta.json()

  // JSONPlaceholder devuelve siempre id 11; usamos Date.now() para garantizar key única
  const participante = {
    id: Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    rol: datos.rol,
  }

  // Guardamos en almacenamiento local para que se refleje al invalidar la query
  guardarLocal(participante)

  return participante
}

