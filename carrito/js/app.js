//Quiero darle funcionalidad a mi carrito de compras

//Variables sobre las que voy a trabajar
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let carritoDeCompras = [];

//Escucha de eventos
cargarEventListeners();
function cargarEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito") || []);
    carritoHTML();
  });
  //De este evento voy a sacar la info del curso que quiero agregar al carrito
  listaCursos.addEventListener("click", agregarAlCarrito);
  //De este evento voy a escuchar cuando quiera eliminar un curso
  carrito.addEventListener("click", eliminarCurso);
  //
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

//Necesito hacer click en agregar al carrito y crear un objeto e insertarlo en el arreglo
function agregarAlCarrito(evento) {
  evento.preventDefault();
  //Chequeo si estoy haciendo click en el btn
  if (evento.target.classList.contains("agregar-carrito")) {
    //Obtengo card del curso
    const cursoDatos = evento.target.parentElement.parentElement;
    cargarCurso(cursoDatos);
  }
}

function cargarCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").getAttribute("src"),
    nombre: curso.querySelector("h4").textContent,
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Chequeo si ya esta el curso en el carrito
  if (carritoDeCompras.some((curso) => curso.id === infoCurso.id)) {
    //Con el map devuelvo un nuevo arreglo "cursos"
    const cursos = carritoDeCompras.map((curso) => {
      //Al curso que ya existe le aumento la cantidad
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        //sino lo devuelvo como esta
        return curso;
      }
    });
    carritoDeCompras = [...cursos];
  } else {
    carritoDeCompras = [...carritoDeCompras, infoCurso];
  }

  //Mostrar HTML
  carritoHTML(infoCurso);
}

function carritoHTML() {
  //Vaciar tbody sino con for each acumulo lo antes agregado y se repiten
  vaciarHTML();

  //Por cada elemento debo crear una fila e intertarla en el html
  carritoDeCompras.forEach((curso) => {
    const newCurso = `<tr>
        <td> <img src="${curso.imagen}" width = 100> </td>
        <td> ${curso.nombre} </td>
        <td> ${curso.precio} </td>
        <td> ${curso.cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td></tr>`;

    contenedorCarrito.innerHTML += newCurso;

    // console.log("curso: " + newCurso);

    // const row = document.createElement("tr");
    // row.innerHTML = `
    //     <td> <img src="${curso.imagen}" width = 100> </td>
    //     <td> ${curso.nombre} </td>
    //     <td> ${curso.precio} </td>
    //     <td> ${curso.cantidad} </td>
    //     <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>
    // `
    // contenedorCarrito.appendChild(row);
  });
  sincronizarLocalStorage();
}

function vaciarHTML() {
  //Forma lenta
  //contenedorCarrito.innerHTML = "";

  //Forma rapida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  sincronizarLocalStorage();
}

function eliminarCurso(evento) {
  evento.preventDefault();

  if (evento.target.classList.contains("borrar-curso")) {
    const idCurso = evento.target.getAttribute("data-id");
    //Elimino curso del arreglo
    carritoDeCompras = carritoDeCompras.filter((curso) => curso.id !== idCurso);

    carritoHTML();
  }
}

function vaciarCarrito() {
  //Reseteo el arreglo
  carritoDeCompras = [];
  vaciarHTML();
  sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
}
