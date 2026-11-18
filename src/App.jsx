import FormularioRegistro from './components/FormularioRegistro'
import ListaParticipantes from './components/ListaParticipantes'

function App() {
  return (
    <div className="contenedor">
      <header>
        <h1>Registro de Participantes Tech</h1>
        <p className="subtitulo">
          Formulario validado con React Hook Form + Zod y gestión remota con TanStack Query
        </p>
      </header>

      <main className="grid">
        <section className="tarjeta" aria-labelledby="titulo-formulario">
          <h2 id="titulo-formulario">Nuevo Participante</h2>
          <FormularioRegistro />
        </section>

        <section className="tarjeta" aria-labelledby="titulo-listado">
          <h2 id="titulo-listado">Participantes Registrados</h2>
          <ListaParticipantes />
        </section>
      </main>
    </div>
  )
}

export default App
