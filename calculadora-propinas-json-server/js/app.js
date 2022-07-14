const crearOrdenBtn = document.querySelector("#guardar-cliente");

let cliente = {
  mesa: "",
  hora: "",
  platillo: [],
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
