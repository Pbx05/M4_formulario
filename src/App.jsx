import FormularioRegistro from './components/FormularioRegistro'
import ListaJugadores from './components/ListaJugadores'

function App() {
  return (
    <div className="contenedor">
      <header>
        <h1>Torneo de Fútbol — Inscripción de Jugadores</h1>
        <p className="subtitulo">
          Regístrate en el torneo y consulta el listado actualizado de jugadores inscritos
        </p>
      </header>

      <main className="grid">
        <section className="tarjeta" aria-labelledby="titulo-formulario">
          <h2 id="titulo-formulario">Inscripción de Jugador</h2>
          <FormularioRegistro />
        </section>

        <section className="tarjeta" aria-labelledby="titulo-listado">
          <h2 id="titulo-listado">Jugadores Inscritos</h2>
          <ListaJugadores />
        </section>
      </main>
    </div>
  )
}

export default App
