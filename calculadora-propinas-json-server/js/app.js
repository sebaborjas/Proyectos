const crearOrdenBtn = document.querySelector("#guardar-cliente");

let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
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
    inputCantidad.id = `producto-${id}`;
    inputCantidad.classList.add("form-control");

    //Esta funcion se encarga de seguirle el rastro al imput de Cantidad
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarPlato({ ...plato, cantidad });
    };

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

function agregarPlato(producto) {
  //Extraer pedido de los clientes
  let { pedido } = cliente;
  //Agregar producto al pedido
  if (producto.cantidad > 0) {
    //Chequeo si ya existe el producto para actualizar la cantidad
    if (pedido.some((articulo) => articulo.id === producto.id)) {
      //Actualizo la cantidad
      const pedidoActualizado = pedido.map((articulo) => {
        if (articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      cliente.pedido = [...pedidoActualizado];
    } else {
      //Agrego el producto
      cliente.pedido = [...pedido, producto];
    }
  } else {
    const resultado = pedido.filter((articulo) => articulo.id !== producto.id);
    cliente.pedido = [...resultado];
  }
  limpiarHTML();
  if (cliente.pedido.length) {
    actualizarResumen();
  } else {
    mensajePedidoVacio();
  }
}

function actualizarResumen() {
  const contenidoResumen = document.querySelector("#resumen .contenido");
  //Div para almacenar mostrar los datos
  const datosResumen = document.createElement("div");
  datosResumen.classList.add("col-md-6");
  //divDatosResumen es para que corregir posocionamiento del grid de bootstrap
  const divDatosResumen = document.createElement("div");
  divDatosResumen.classList.add("card", "shadow", "py-3", "px-3");
  //
  const mesa = document.createElement("p");
  mesa.textContent = "Mesa: ";
  mesa.classList.add("fw-bold");
  const mesaSpan = document.createElement("span");
  mesaSpan.textContent = cliente.mesa;
  mesaSpan.classList.add("fw-normal");
  mesa.appendChild(mesaSpan);
  //
  const hora = document.createElement("p");
  hora.textContent = "Hora: ";
  hora.classList.add("fw-bold");
  const horaSpan = document.createElement("span");
  horaSpan.textContent = cliente.hora;
  horaSpan.classList.add("fw-normal");
  hora.appendChild(horaSpan);

  //Titulo de la seccion
  const heading = document.createElement("h3");
  heading.textContent = "Platos consumidos";
  heading.classList.add("my-2", "text-center");

  //Iterar sobre el array para mostrar platos y cantidades
  const grupo = document.createElement("ul");
  grupo.classList.add("list-group");
  const { pedido } = cliente;
  pedido.forEach((articulo) => {
    const { nombre, cantidad, id, precio } = articulo;
    const lista = document.createElement("li");
    lista.classList.add("list-group-item");

    //Nombre del articulo
    const nombreElement = document.createElement("h4");
    nombreElement.classList.add("my-4");
    nombreElement.textContent = nombre;

    //Cantidad de articulos
    const cantidadElement = document.createElement("p");
    cantidadElement.classList.add("fw-bold");
    cantidadElement.textContent = "Cantidad: ";

    const cantidadElementValor = document.createElement("span");
    cantidadElementValor.classList.add("fw-normal");
    cantidadElementValor.textContent = cantidad;

    //Precio del palto
    const precioElement = document.createElement("p");
    precioElement.classList.add("fw-bold");
    precioElement.textContent = "Precio: ";

    const precioElementValor = document.createElement("span");
    precioElementValor.classList.add("fw-normal");
    precioElementValor.textContent = `$${precio}`;

    //Subtotal de los platos
    const subtotalElement = document.createElement("p");
    subtotalElement.classList.add("fw-bold");
    subtotalElement.textContent = "Subtotal: ";

    const subtotalElementValor = document.createElement("span");
    subtotalElementValor.classList.add("fw-normal");
    subtotalElementValor.textContent = calcularSubTotal(cantidad, precio);

    //Boton de eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar del pedido";

    //Funcion para elminar del pedido
    btnEliminar.onclick = function () {
      eliminarProducto(id);
    };

    //Anidamineto de nombre: valor
    cantidadElement.appendChild(cantidadElementValor);
    precioElement.appendChild(precioElementValor);
    subtotalElement.appendChild(subtotalElementValor);

    //Anidando nombre: valor a una lista
    lista.appendChild(nombreElement);
    lista.appendChild(cantidadElement);
    lista.appendChild(precioElement);
    lista.appendChild(subtotalElement);
    lista.appendChild(btnEliminar);

    //Agrupo lista
    grupo.appendChild(lista);
  });
  //Agrupacion elementos de formulario de platos consumidos
  divDatosResumen.appendChild(heading);
  divDatosResumen.appendChild(mesa);
  divDatosResumen.appendChild(hora);
  divDatosResumen.appendChild(grupo);
  datosResumen.appendChild(divDatosResumen);

  //Agrego el fomulario a resumen
  contenidoResumen.appendChild(datosResumen);

  //Ahora debo crear el formulario de pago y de propinas
  formularioPropinas();
}

function limpiarHTML() {
  const contenidoResumen = document.querySelector("#resumen .contenido");
  while (contenidoResumen.firstChild) {
    contenidoResumen.removeChild(contenidoResumen.firstChild);
  }
}

function calcularSubTotal(cantidad, precio) {
  return `$${cantidad * precio}`;
}

function eliminarProducto(id) {
  const { pedido } = cliente;
  const resultado = pedido.filter((articulo) => articulo.id !== id);
  cliente.pedido = [...resultado];
  limpiarHTML();
  if (cliente.pedido.length) {
    actualizarResumen();
  } else {
    mensajePedidoVacio();
  }

  const productoEliminado = `#producto-${id}`;
  const inputEliminado = document.querySelector(productoEliminado);
  inputEliminado.value = 0;
}

function mensajePedidoVacio() {
  const contenidoResumen = document.querySelector("#resumen .contenido");

  const texto = document.createElement("p");
  texto.classList.add("text-center");
  texto.textContent = "Añade los elementos del pedido";

  contenidoResumen.appendChild(texto);
}

function formularioPropinas() {
  //Creando formulario
  const contenido = document.querySelector("#resumen .contenido");
  //
  const formulario = document.createElement("div");
  formulario.classList.add("col-md-6", "formulario");
  //
  const divFormulario = document.createElement("div");
  divFormulario.classList.add("card", "shadow", "py-3", "px-3");
  //
  const header = document.createElement("h3");
  header.textContent = "Propinas";
  header.classList.add("my-2", "text-center");
  //
  divFormulario.appendChild(header);
  formulario.appendChild(divFormulario);
  contenido.appendChild(formulario);
}
