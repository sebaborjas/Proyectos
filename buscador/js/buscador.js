//VARIABLES
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const max = new Date().getFullYear();
const min = max - 12;
const resultado = document.querySelector("#resultado");

const buscador = document.querySelector("#buscador");

//Escuchando eventos

document.addEventListener("DOMContentLoaded", () => {
  eventsListener();
  cargarYears();
  cargarAutos(autos);
});

function eventsListener() {
  marca.addEventListener("change", (evento) => {
    datos.marca = evento.target.value;
    filtrarAuto();
  });
  year.addEventListener("change", (evento) => {
    datos.year = parseInt(evento.target.value);
    filtrarAuto();
  });
  minimo.addEventListener("change", (evento) => {
    datos.minimo = parseInt(evento.target.value);
    filtrarAuto();
  });
  maximo.addEventListener("change", (evento) => {
    datos.maximo = parseInt(evento.target.value);
    filtrarAuto();
  });
  puertas.addEventListener("change", (evento) => {
    datos.puertas = parseInt(evento.target.value);
    filtrarAuto();
  });
  transmision.addEventListener("change", (evento) => {
    datos.transmision = evento.target.value;
    filtrarAuto();
  });
  color.addEventListener("change", (evento) => {
    datos.color = evento.target.value;
    filtrarAuto();
  });
}

//NECESITO GUARDAR LOS DATOS DE LA BUSQUEDA
const datos = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//CARGAR ANIOS EN EL SELECT
function cargarYears() {
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

//CARGO AUTOS EN EL HTML
function cargarAutos(arregloAutos) {
  if (arregloAutos.length > 0) {
    arregloAutos.forEach((auto) => {
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;
      const autoHTML = document.createElement("p");
      autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision}
        `;
      resultado.appendChild(autoHTML);
    });
  } else {
    const mensaje = document.createElement("p");
    mensaje.textContent =
      "No se han encontrado vehiculos relacionados a su busqueda";
    mensaje.classList.add("error", "alerta");
    resultado.appendChild(mensaje);
  }
}

function filtrarAuto() {
  const filtrado = autos
    .filter(filtrarMarca)
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  console.log(filtrado);
  limpiarHTML();
  cargarAutos(filtrado);
}

function filtrarMarca(auto) {
  if (datos.marca) {
    return auto.marca === datos.marca;
  } else {
    return auto;
  }
}
function filtrarYear(auto) {
  if (datos.year) {
    return auto.year === datos.year;
  } else {
    return auto;
  }
}
function filtrarMinimo(auto) {
  if (datos.minimo) {
    return auto.precio >= datos.minimo;
  } else {
    return auto;
  }
}
function filtrarMaximo(auto) {
  if (datos.maximo) {
    return auto.precio <= datos.maximo;
  } else {
    return auto;
  }
}
function filtrarPuertas(auto) {
  if (datos.puertas) {
    return auto.puertas === datos.puertas;
  } else {
    return auto;
  }
}
function filtrarTransmision(auto) {
  if (datos.transmision) {
    return auto.transmision === datos.transmision;
  } else {
    return auto;
  }
}
function filtrarColor(auto) {
  if (datos.color) {
    return auto.color === datos.color;
  } else {
    return auto;
  }
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
