import FormularioRegistro from './components/FormularioRegistro'

function App() {
  function manejarRegistroPrueba(datos) {
    console.log('Datos del formulario validados con Zod:', datos)
  }

  return (
    <div className="contenedor">
      <header>
        <h1>Registro de Participantes Tech</h1>
        <p className="subtitulo">
          Formulario validado con React Hook Form + Zod y gestión remota con TanStack Query
        </p>
      </header>

      <main className="grid">
        <section className="tarjeta">
          <h2>Nuevo Participante</h2>
          <FormularioRegistro onRegistrar={manejarRegistroPrueba} />
        </section>

        <section className="tarjeta">
          <h2>Participantes Registrados</h2>
          <p className="estado-mensaje">
            Conectando datos remotos con useQuery en el Paso 4...
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
