/* 
1-Cargar el el formulario los datos almacenados:
    -Peticion a API
    -Cargar campos
2-Cargar los datos actualizados:
    -Obtener el submit
    -Peticion a API
    -Return a index.html
*/

import { obtenerCliente, actualizarCliente } from "./API.js";
import { mostrarAlerta } from "./funciones.js";

(function () {
  const formulario = document.querySelector("#formulario");
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");
  const idInput = document.querySelector("#id");

  document.addEventListener("DOMContentLoaded", async () => {
    const parametrosURL = new URLSearchParams(window.location.search);

    const id = parseInt(parametrosURL.get("id"));

    const cliente = await obtenerCliente(id);
    cargarCampos(cliente);

    formulario.addEventListener("submit", editarCliente);
  });
  function cargarCampos(cliente) {
    const { nombre, email, telefono, empresa, id } = cliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
    idInput.value = id;
  }

  function editarCliente(e) {
    e.preventDefault();
    const cliente = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: parseInt(idInput.value),
    };

    if (!Object.values(cliente).every((campo) => campo !== "")) {
      mostrarAlerta("Todos los campos son obligatorios");
      return;
    }

    actualizarCliente(cliente);
  }
})();
