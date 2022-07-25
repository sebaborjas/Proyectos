/* 
1- Recivo el objeto cliente con los campos
2-Peticion fetch POST a la API    

*/

const url = "http://localhost:5000/clientes";

//Agregar clientes
export const nuevoCliente = async (cliente) => {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Una vez terminada la peticion envio al usuario a index
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};

//Para mostrar clientes en index
export const cargarClientes = async () => {
  try {
    const resultado = await fetch(url);
    const clientes = await resultado.json();
    return clientes;
  } catch (error) {
    console.log(error);
  }
};

//Eliminar clientes de la api
export const eliminarCliente = async (id) => {
  try {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

//Obtener cliente por el id
export const obtenerCliente = async (id) => {
  try {
    const resultado = await fetch(`${url}/${id}`);
    const cliente = await resultado.json();
    return cliente;
  } catch (error) {
    console.log(error);
  }
};

//Actualizar cliente
export const actualizarCliente = async (cliente) => {
  try {
    await fetch(`${url}/${cliente.id}`, {
      method: "PUT",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Una vez terminada la peticion envio al usuario a index
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};
