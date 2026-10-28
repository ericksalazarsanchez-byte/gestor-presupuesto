# Gestor de Presupuesto Personal (Soles Peruanos)

## Descripción
Aplicación web responsiva para la gestión dinámica de ingresos y gastos personales expresados en Soles Peruanos (S/.). Desarrollada con HTML5, Tailwind CSS (vía CDN) y JavaScript ES6 aplicando Programación Orientada a Objetos (POO) y Programación Funcional.

---

## Decisiones Técnicas Clave & Arquitectura

### 1. Paradigma Orientado a Objetos y Encapsulación (C07 / C08)
- **Clase `Movimiento`**: Modela cada transacción financiera. Utiliza campos privados (`#id`, `#concepto`, `#monto`, `#tipo`, `#categoria`, `#fecha`) para proteger los datos internos y expone su acceso seguro a través de `getters`.
- **Clase `Presupuesto`**: Capa de servicio encargada de almacenar y gestionar la lista de objetos `Movimiento`. Contiene métodos para agregar, eliminar y calcular balances dinámicos.

### 2. Programación Funcional
- **Métodos de Array (`map`, `filter`, `reduce`)**: 
  - `filter`: Aplicado en `calcularTotalIngresos()`, `calcularTotalGastos()`, `eliminarMovimiento()` y en el filtro interactivo del historial para operar sin modificar la estructura base de forma imprevista.
  - `reduce`: Aplicado en la acumulación de los totales de ingresos y gastos para retornar el balance general de la aplicación.

### 3. Diseños Mobile-First e Interfaz con Tailwind CSS
- **Mobile-First**: Se estructuraron los componentes base para pantallas móviles pequeñas y se escalaron a través del prefijo de modificador `md:` (`grid-cols-1 md:grid-cols-3` y `md:col-span-2`), garantizando apilamiento vertical en móviles y visualización en columnas en pantallas grandes.
- **Clases Utilitarias vs. Modificadores**:
  - *Clase-propiedad*: Clases fijas de utilidad como `p-4`, `bg-white`, `font-bold`.
  - *Prefijos-modificadores*: Reglas condicionales como `hover:bg-blue-700` (estado hover) o `md:grid-cols-3` (responsividad por pantalla).

---

## Historias de Usuario Implementadas (Retos)

### HU1: Categorización de Movimientos
- **Como** usuario del gestor, **quiero** asignar una categoría a cada movimiento (Trabajo, Alimentación, Servicios, etc.) **para** clasificar adecuadamente el destino de mis finanzas en Soles.
- **Criterios de Aceptación**:
  1. Campo de selección de categoría integrado en el formulario de registro.
  2. Almacenamiento directo de la categoría dentro de la propiedad privada de la clase `Movimiento`.
  3. Visualización de la categoría en cada ítem renderizado en el historial.

### HU2: Filtrado Interactivo por Tipo de Movimiento
- **Como** usuario, **quiero** filtrar el historial entre "Todos", "Ingresos" y "Gastos" **para** analizar de manera aislada mis flujos de dinero.
- **Criterios de Aceptación**:
  1. Menú desplegable de filtrado en la cabecera del historial.
  2. Re-renderizado en tiempo real según la opción seleccionada mediante eventos de cambio (`change`).
  3. Mantenimiento del cálculo del saldo total global de forma independiente al filtro visual seleccionado.