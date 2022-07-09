//VERIFICAION DE FORMULARIO

//VARIABLES SOBRE LAS QUE VOY A TRABAJAR
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btnEnviar = document.querySelector("#enviar");
const btnResetForm = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
const regularExpressionMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//ESCUCHANDO EVENTOS
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  formulario.addEventListener("submit", enviarFormulario);
  btnResetForm.addEventListener("click", resetFormulario);
}

//FUNCIONAMIENTO DE LA VALIDACION
iniciarApp();
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(evento) {
  if (evento.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error !== null) {
      error.remove();
    }
    campoVerde(evento);
  } else {
    campoRojo(evento);
    mostrarError("Todos los campos son obligatorios");
  }

  //VALIDACION DEL MAIL CON EXPRESION REGULAR
  if (evento.target.type === "email") {
    if (regularExpressionMail.test(evento.target.value)) {
    } else {
      campoRojo(evento);
      mostrarError("Email no valido");
    }
  }

  //SI ESTA TODO CORRECTO
  if (
    regularExpressionMail.test(email.value) &&
    asunto.value != "" &&
    mensaje.value != ""
  ) {
    habilitarEnvio();
  }
}

function mostrarError(mensaje) {
  const errorMsj = document.createElement("p");
  errorMsj.textContent = mensaje;
  errorMsj.classList.add(
    "error",
    "border",
    "border-red-500",
    "mt-3",
    "p-5",
    "text-red-500",
    "bg-red-100",
    "text-center"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(errorMsj);
  }
}

function campoVerde(campo) {
  if (campo.target.classList.contains("border-red-500")) {
    campo.target.classList.remove("border-red-500");
    campo.target.classList.add("border-green-500");
  } else {
    campo.target.classList.add("border-green-500");
  }
}

function campoRojo(campo) {
  if (campo.target.classList.contains("border-green-500")) {
    campo.target.classList.remove("border-green-500");
    campo.target.classList.add("border-red-500");
  } else {
    campo.target.classList.add("border-red-500");
  }
}

function resetCampos() {
  console.log("camposreset");
  email.classList.remove("border-green-500");
  email.classList.remove("border-red-500");
  asunto.classList.remove("border-green-500");
  asunto.classList.remove("border-red-500");
  mensaje.classList.remove("border-green-500");
  mensaje.classList.remove("border-red-500");
  const errores = document.querySelectorAll(".error");
  if (errores.length > 0) {
    formulario.removeChild(formulario.lastChild);
  }
}

function habilitarEnvio() {
  btnEnviar.disabled = false;
  btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
}

function enviarFormulario(evento) {
  console.log("Inicio");
  evento.preventDefault();
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";
  setTimeout(() => {
    spinner.style.display = "none";

    const msj = document.createElement("p");
    msj.textContent = "Email enviado con exito";
    msj.classList.add(
      "border",
      "border-green-500",
      "my-5",
      "p-1",
      "text-white",
      "bg-green-600",
      "text-center",
      "font-bold",
      "upper-case"
    );
    console.log("Holaaaa");
    formulario.insertBefore(msj, spinner);
    setTimeout(() => {
      msj.remove();
      resetCampos();
      formulario.reset();
      iniciarApp();
    }, 3000);
  }, 3000);
}

function resetFormulario(e) {
  e.preventDefault();
  console.log("desde reset");

  formulario.reset();
  resetCampos();
  iniciarApp();
}
