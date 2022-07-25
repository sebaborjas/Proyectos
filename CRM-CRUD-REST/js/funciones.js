export function mostrarAlerta(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("p");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class="font-bold" > Error! </strong>
        <span class="block sm:inline" >${mensaje}</span>
         `;
    const formulario = document.querySelector("#formulario");
    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

export function imprimirClientes(tableClientes, clientes) {
  const { nombre, email, telefono, empresa, id } = clientes;
  const row = document.createElement("tr");
  row.innerHTML += `
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
      <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
      <p class="text-sm leading-10 text-gray-700"> ${email} </p>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
      <p class="text-gray-700">${telefono}</p>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
      <p class="text-gray-600">${empresa}</p>
  </td>
  <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
      <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
      <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
  </td>
`;
  tableClientes.appendChild(row);
}
