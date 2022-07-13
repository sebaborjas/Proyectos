const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const container = document.querySelector(".container");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", enviarFormulario);
});

function enviarFormulario(e) {
  e.preventDefault();

  //Validacion del formulario
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Todos los campos son obligatorios");
    return;
  }
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const hayAlerta = document.querySelector(".bg-red-100");
  if (!hayAlerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        
        `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "0b34706e439e12db95ce253a90366e41";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  mostrarSpinner();

  fetch(url)
    .then((resultado) => resultado.json())
    .then((datos) => {
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("No se ha encontrado la ciudad");
        return;
      }
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;
  const actualCelsius = kelvinToCelcius(temp);
  const max = kelvinToCelcius(temp_max);
  const min = kelvinToCelcius(temp_min);

  const actual = document.createElement("p");
  actual.classList.add("font-bold", "text-6xl");
  actual.innerHTML = `${actualCelsius} &#8451; `;

  const maxTemp = document.createElement("p");
  maxTemp.classList.add("text-2xl");
  maxTemp.innerHTML = `Max: ${max} &#8451; `;

  const minTemp = document.createElement("p");
  minTemp.classList.add("text-2xl");
  minTemp.innerHTML = `Min: ${min} &#8451; `;

  const nombre = document.createElement("p");
  nombre.classList.add("font-bold", "text-4xl");
  nombre.innerHTML = `${name} `;

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombre);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(maxTemp);
  resultadoDiv.appendChild(minTemp);

  resultado.appendChild(resultadoDiv);
}

const kelvinToCelcius = (temperatura) => parseInt(temperatura - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHTML();
  divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle", "text-white");
  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
     
    `;
  resultado.appendChild(divSpinner);
}
