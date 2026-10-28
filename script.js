class Movimiento {
  #id;
  #concepto;
  #monto;
  #tipo;
  #categoria;
  #fecha;

  constructor(concepto, monto, tipo, categoria = "General") {
    this.#id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    this.#concepto = concepto;
    this.#monto = Number(monto);
    this.#tipo = tipo;
    this.#categoria = categoria;
    this.#fecha = new Date();
  }

  get id() {
    return this.#id;
  }

  get concepto() {
    return this.#concepto;
  }

  get monto() {
    return this.#monto;
  }

  get tipo() {
    return this.#tipo;
  }

  get categoria() {
    return this.#categoria;
  }

  get fecha() {
    return this.#fecha;
  }
}

class Presupuesto {
  #movimientos;

  constructor() {
    this.#movimientos = [];
  }

  agregarMovimiento(movimiento) {
    if (!(movimiento instanceof Movimiento)) {
      throw new Error("El objeto debe ser una instancia de la clase Movimiento.");
    }
    this.#movimientos.push(movimiento);
  }

  eliminarMovimiento(id) {
    this.#movimientos = this.#movimientos.filter(m => m.id !== id);
  }

  obtenerMovimientos(filtroTipo = "todos") {
    if (filtroTipo === "todos") {
      return [...this.#movimientos];
    }
    return this.#movimientos.filter(m => m.tipo === filtroTipo);
  }

  calcularTotalIngresos() {
    return this.#movimientos
      .filter(m => m.tipo === "ingreso")
      .reduce((acumulado, m) => acumulado + m.monto, 0);
  }

  calcularTotalGastos() {
    return this.#movimientos
      .filter(m => m.tipo === "gasto")
      .reduce((acumulado, m) => acumulado + m.monto, 0);
  }

  calcularSaldoTotal() {
    return this.calcularTotalIngresos() - this.calcularTotalGastos();
  }
}

const miPresupuesto = new Presupuesto();

const formMovimiento = document.getElementById("form-movimiento");
const conceptoInput = document.getElementById("concepto");
const montoInput = document.getElementById("monto");
const tipoInput = document.getElementById("tipo");
const categoriaInput = document.getElementById("categoria");
const filtroTipoSelect = document.getElementById("filtro-tipo");

const saldoTotalEl = document.getElementById("saldo-total");
const totalIngresosEl = document.getElementById("total-ingresos");
const totalGastosEl = document.getElementById("total-gastos");
const listaMovimientosEl = document.getElementById("lista-movimientos");

function renderUI() {
  const filtroActual = filtroTipoSelect.value;
  const movimientosFiltrados = miPresupuesto.obtenerMovimientos(filtroActual);

  saldoTotalEl.textContent = `S/. ${miPresupuesto.calcularSaldoTotal().toFixed(2)}`;
  totalIngresosEl.textContent = `S/. ${miPresupuesto.calcularTotalIngresos().toFixed(2)}`;
  totalGastosEl.textContent = `S/. ${miPresupuesto.calcularTotalGastos().toFixed(2)}`;

  listaMovimientosEl.innerHTML = "";

  if (movimientosFiltrados.length === 0) {
    listaMovimientosEl.innerHTML = `
      <li class="py-4 text-center text-gray-500 italic">No hay movimientos registrados.</li>
    `;
    return;
  }

  movimientosFiltrados.forEach(m => {
    const li = document.createElement("li");
    li.className = "py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded-md transition";

    const esIngreso = m.tipo === "ingreso";
    const colorTexto = esIngreso ? "text-green-600" : "text-red-600";
    const signo = esIngreso ? "+" : "-";

    li.innerHTML = `
      <div class="flex flex-col">
        <span class="font-semibold text-gray-800">${m.concepto}</span>
        <span class="text-xs text-gray-500">Categoría: <span class="font-medium text-gray-700">${m.categoria}</span></span>
      </div>
      <div class="flex items-center gap-3">
        <span class="font-bold ${colorTexto}">${signo} S/. ${m.monto.toFixed(2)}</span>
        <button data-id="${m.id}" class="btn-eliminar text-gray-400 hover:text-red-600 transition p-1" title="Eliminar">
          <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    `;

    listaMovimientosEl.appendChild(li);
  });
}

formMovimiento.addEventListener("submit", (e) => {
  e.preventDefault();

  const concepto = conceptoInput.value.trim();
  const monto = parseFloat(montoInput.value);
  const tipo = tipoInput.value;
  const categoria = categoriaInput.value;

  if (!concepto || isNaN(monto) || monto <= 0) {
    alert("Por favor ingrese valores válidos.");
    return;
  }

  const nuevoMovimiento = new Movimiento(concepto, monto, tipo, categoria);
  miPresupuesto.agregarMovimiento(nuevoMovimiento);

  formMovimiento.reset();
  renderUI();
});

listaMovimientosEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const id = e.target.getAttribute("data-id");
    miPresupuesto.eliminarMovimiento(id);
    renderUI();
  }
});

filtroTipoSelect.addEventListener("change", () => {
  renderUI();
});

renderUI();