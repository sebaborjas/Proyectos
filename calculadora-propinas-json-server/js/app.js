const crearOrdenBtn = document.querySelector("#guardar-cliente");

let cliente = {
  mesa: "",
  hora: "",
  platillo: [],
};

crearOrdenBtn.addEventListener("click", verificarFormulario);

function verificarFormulario(e) {
  const inputMesa = document.querySelector("#mesa").value;
  const inputHora = document.querySelector("#hora").value;
  const campoVacio = [inputMesa, inputHora].some((campo) => campo === "");
  if (campoVacio) {
    mostrarMensaje("Los campos son obligatorios");
    return;
  }
  console.log("Los campos estan completos");
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
