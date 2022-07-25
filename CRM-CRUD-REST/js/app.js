import { cargarClientes, eliminarCliente } from "./API.js";
import { imprimirClientes } from "./funciones.js";

(function () {
  const listadoClientes = document.querySelector("#listado-clientes");

  document.addEventListener("DOMContentLoaded", mostrarClientes);

  async function mostrarClientes() {
    const listaClientes = await cargarClientes();
    listaClientes.forEach((cliente) =>
      imprimirClientes(listadoClientes, cliente)
    );
  }

  //Escucho por si presionan eliminar cliente
  listadoClientes.addEventListener("click", confirmarEliminar);

  function confirmarEliminar(e) {
    if (e.target.classList.contains("eliminar")) {
      const clienteId = parseInt(e.target.dataset.cliente);
      const confirmar = confirm("Desea eliminar este cliente?");
      if (confirmar) {
        eliminarCliente(clienteId);
      }
    }
  }
})();
