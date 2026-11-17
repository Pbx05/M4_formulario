function App() {
  return (
    <div className="contenedor">
      <header>
        <h1>Registro de Participantes Tech</h1>
        <p className="subtitulo">
          Gestión de altas y listado remoto en tiempo real
        </p>
      </header>

      <main className="grid">
        <section className="tarjeta">
          <h2>Formulario de Registro</h2>
          <p className="estado-mensaje">Configurando formulario en el siguiente paso...</p>
        </section>

        <section className="tarjeta">
          <h2>Participantes Registrados</h2>
          <p className="estado-mensaje">Configurando listado en los siguientes pasos...</p>
        </section>
      </main>
    </div>
  )
}

export default App
