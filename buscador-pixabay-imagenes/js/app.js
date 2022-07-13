const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const paginacion = document.querySelector("#paginacion");

let cantPaginas;
let iterador;
let actualPagina = 1;

window.onload = () => {
  formulario.addEventListener("submit", verificarFormulario);
};

function verificarFormulario(e) {
  e.preventDefault();
  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    mostrarError("Ingrese un termino de busqueda");
    return;
  }
  buscarImagen();
}

function mostrarError(texto) {
  const hayError = document.querySelector(".hay-error");
  if (!hayError) {
    const mensaje = document.createElement("p");
    mensaje.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "hay-error"
    );
    mensaje.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${texto}</span>
          `;
    resultado.appendChild(mensaje);

    setTimeout(() => {
      mensaje.remove();
    }, 3000);
  }
}

function buscarImagen() {
  const termino = document.querySelector("#termino").value;
  const key = "28593367-59abc67e420a5f5f39c4a348e";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=30&page=${actualPagina}`;
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      cantPaginas = calcularPaginas(resultado.totalHits);
      imprimirHTMl(resultado.hits);
    });
}

function imprimirHTMl(busqueda) {
  limpiarHTMl();
  busqueda.forEach((imagen) => {
    const { previewURL, views, likes, largeImageURL } = imagen;
    resultado.innerHTML += `
    
    
    <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
    
        <div class="bg-white">
    
            <img class="w-full" src="${previewURL}"></img>

            <div class="p-4">
            
                <p class="font-bold"> ${likes}  <span class="font-light"> Likes </span> </p>

                <p class="font-bold"> ${views}  <span class="font-light"> Visitas </span> </p>

                <a href="${largeImageURL}"  class = "w-full bg-blue-800 hover:bg-blue-500 text-white uppercase block font-bold text-center rounded mt-5 p-1" target="_blank" rel="noopener noreferrer" " > Ver imagen </a>
            
            </div>
    
        </div>
    
    </div>   
    `;
  });
  //Limpiar paginas previas
  while (paginacion.firstChild) {
    paginacion.removeChild(paginacion.firstChild);
  }
  imprimirPaginador();
}

function limpiarHTMl() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / 30));
}

function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}

function imprimirPaginador() {
  iterador = crearPaginador(cantPaginas);
  while (true) {
    const { value, done } = iterador.next();
    if (done) return;

    //Caso contrario genero boton para cada pagina
    const boton = document.createElement("a");
    boton.href = "#";
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.classList.add(
      "siguiente",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "font-bold",
      "mb-1",
      "rounded"
    );
    boton.onclick = () => {
      actualPagina = value;
      buscarImagen();
    };
    paginacion.appendChild(boton);
  }
}
