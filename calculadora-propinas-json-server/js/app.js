const crearOrdenBtn = document.querySelector("#guardar-cliente");

let cliente = {
  mesa: "",
  hora: "",
  platillo: [],
};

const categoriaMenuPlatos = {
  1: "Comida",
  2: "Bebida",
  3: "Postre",
};

crearOrdenBtn.addEventListener("click", crearOrden);

function crearOrden(e) {
  //Verificacion del formulario
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;
  const campoVacio = [mesa, hora].some((campo) => campo === "");
  if (campoVacio) {
    mostrarMensaje("Los campos son obligatorios");
    return;
  }
  guardarCliente(mesa, hora);
  mostrarSecciones();
  imprimirCarta();
}

function mostrarMensaje(texto) {
  const error = document.querySelector(".invalid-feedback");
  if (!error) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("d-block", "text-center", "invalid-feedback");
    mensaje.textContent = texto;
    document.querySelector(".modal-body form").appendChild(mensaje);
    setTimeout(() => {
      mensaje.remove();
    }, 3000);
  }
}

function guardarCliente(mesa, hora) {
  cliente = { ...cliente, mesa, hora };
  const modalFormulario = document.querySelector("#formulario");
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBootstrap.hide();
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll(".d-none");
  seccionesOcultas.forEach((seccion) => seccion.classList.remove("d-none"));
}

function imprimirCarta() {
  const url = "http://localhost:4000/platillos/";
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      imprimirHTML(resultado);
    });
}

function imprimirHTML(menu) {
  const contenidoPlato = document.querySelector("#platillos .contenido");
  menu.forEach((plato) => {
    const { nombre, precio, categoria, id } = plato;

    //Creo fila para almacenar datos utilizo grid de bootstrap
    const row = document.createElement("div");
    row.classList.add("row", "py-3", "border-top");

    //Div para almacenar el nombre del plato
    const nombrePlato = document.createElement("div");
    nombrePlato.classList.add("col-md-4");
    nombrePlato.textContent = nombre;

    //Div para el precio
    const precioPlato = document.createElement("div");
    precioPlato.classList.add("col-md-3", "fw-bold");
    precioPlato.textContent = `$${precio}`;

    //Div para la categoria
    const categoriaPlato = document.createElement("div");
    categoriaPlato.classList.add("col-md-3");
    categoriaPlato.textContent = categoriaMenuPlatos[categoria];

    //Input para saber cuantos platos agrego a la orden
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = id;
    inputCantidad.classList.add("form-control");
    console.log(inputCantidad);

    //Div para el input
    const inputDiv = document.createElement("div");
    inputDiv.classList.add("col-md-2");
    //Agrego el input al div
    inputDiv.appendChild(inputCantidad);

    //Los agrego como columnas de mi fila
    row.appendChild(nombrePlato);
    row.appendChild(precioPlato);
    row.appendChild(categoriaPlato);
    row.appendChild(inputDiv);
    contenidoPlato.appendChild(row);
  });
}
