import { esquemaListaJugadores } from '../schemas/jugadorSchema'

const API_URL = import.meta.env.VITE_API_URL
const POSICIONES_POR_DEFECTO = ['Portero', 'Defensa', 'Centrocampista', 'Delantero', 'Defensa']

// Ayudantes para persistir temporalmente las inscripciones locales simuladas
function obtenerLocales() {
  try {
    const guardados = localStorage.getItem('jugadores_torneo')
    return guardados ? JSON.parse(guardados) : []
  } catch {
    return []
  }
}

function guardarLocal(nuevo) {
  try {
    const actuales = obtenerLocales()
    const actualizados = [nuevo, ...actuales]
    localStorage.setItem('jugadores_torneo', JSON.stringify(actualizados))
  } catch {
    // Si localStorage falla, la petición continúa
  }
}

// 1. Obtener jugadores inscritos desde la API remota (GET)
export async function obtenerJugadores() {
  const respuesta = await fetch(`${API_URL}/users`)

  // fetch no rechaza la promesa en 4xx/5xx: comprobamos respuesta.ok
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`)
  }

  const json = await respuesta.json()

  // Adaptamos los primeros 5 datos remotos de JSONPlaceholder como jugadores iniciales
  const remotos = json.slice(0, 5).map((u, indice) => ({
    id: u.id,
    nombre: u.name,
    email: u.email,
    posicion: POSICIONES_POR_DEFECTO[indice % POSICIONES_POR_DEFECTO.length],
  }))

  // Unimos los inscritos localmente con los remotos
  const locales = obtenerLocales()
  const todos = [...locales, ...remotos]

  // Validamos la respuesta completa con el esquema Zod (sección 11 del temario)
  return esquemaListaJugadores.parse(todos)
}

// 2. Inscribir nuevo jugador en la API remota (POST)
export async function crearJugador(datos) {
  const respuesta = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo inscribir al jugador en el servidor')
  }

  await respuesta.json()

  // JSONPlaceholder devuelve siempre id 11; usamos Date.now() para garantizar key única
  const jugador = {
    id: Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    posicion: datos.posicion,
  }

  // Guardamos en almacenamiento local para que se refleje al invalidar la query
  guardarLocal(jugador)

  return jugador
}
