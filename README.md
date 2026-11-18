## Uso de IA

He utilizado la IA en este trabajo sobre todo para:

* Mejorar el diseño y los estilos accesibles con CSS.
* Entender bien cómo conectar React Hook Form con Zod usando zodResolver y validar campos cruzados como las contraseñas.
* Gestionar correctamente las peticiones, los estados de carga/error y la invalidación de la caché en TanStack Query v5.

### Prompts principales

* **Validación del formulario con Zod y React Hook Form**
  > *Quiero hacer un formulario de inscripción de jugadores con React Hook Form y Zod donde las contraseñas tengan que coincidir y los errores sean accesibles, ¿cómo debería plantear el esquema y los atributos ARIA?*
  
  Este prompt me ayudó a estructurar el esquema Zod como única fuente de verdad y a dejar bien conectados los mensajes de error con aria-invalid, aria-describedby y role="alert"

### Validación del código
He tratado de evitar copiar código sin entenderlo para comprender bien cada paso de la práctica. En las partes donde sí me apoyé en ejemplos generados, como el refinamiento de contraseñas en Zod o la estructura de useQuery y useMutation, revisé que coincidiera con lo visto en el temario de la asignatura para poder replicarlo sin problemas.

### Autopsia
* Separar las llamadas fetch en una capa de servicios:
En lugar de escribir los fetch directamente dentro de useQuery y useMutation en los componentes, decidí sacarlos a un archivo propio (src/services/jugadores.js). Así los componentes solo se encargan de pintar la interfaz y los estados de TanStack Query, sin mezclar detalles de la URL, cabeceras o comprobación de respuesta.ok
