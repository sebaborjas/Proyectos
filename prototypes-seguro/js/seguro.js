//Podemos identficar que vamos a tener 2 objetos
//Uno para la interfaz
//Otro para la cotizacion del seguro

//CREAMOS LOS OBJETOS
function cotizacionSeguro(marca, year, tipo) {
  (this.marca = marca), (this.year = year), (this.tipo = tipo);
}

//PROTO PARA CALCULAR SEGURO
cotizacionSeguro.prototype.cotizar = function () {
  /* 
    1 = Americano => precio auemnta 15%
    2 = Asiatico => precio auemnta 5%
    3 = Europeo => precio auemnta 35%
    */
  let precio;
  const base = 12000;
  switch (this.marca) {
    case "1":
      precio = base * 1.15;
      break;
    case "2":
      precio = base * 1.05;
      break;
    case "3":
      precio = base * 1.35;
      break;
    default:
      break;
  }
  /* Por cada anio mas viejo, el precio disminuye un 3%*/
  const diferencia = new Date().getFullYear() - this.year;
  precio -= (diferencia * 3 * precio) / 100;
  //Si es basico auemnta un 30% si es completo un 50%
  if (this.tipo === "basico") {
    precio = precio * 1.3;
  } else {
    precio = precio * 1.5;
  }
  return Math.round(precio);
};

function UI() {}

//PROTO PARA LLENAR EL CAMPO YEAR
UI.prototype.llenarOpciones = function () {
  const max = new Date().getFullYear();
  const min = max - 22;
  //TRAER CAMPO YEAR SOBRE EL QUE VOY A AGREGAR LOS ANIOS
  const year = document.querySelector("#year");
  for (let i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    year.appendChild(option);
  }
};

//PROTO PARA MOSTRAR MENSAJES
UI.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");
  div.classList.add("mensaje", "mt-10");
  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.innerText = mensaje;
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));
  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResumen = function (seguro, precio) {
  const { marca, year, tipo } = seguro;
  const div = document.createElement("div");
  div.classList.add("mt-10");
  let textoMarca;
  switch (marca) {
    case "1":
      textoMarca = "Americana";

      break;
    case "2":
      textoMarca = "Asiatica";
      break;
    case "3":
      textoMarca = "Europea";
      break;

    default:
      break;
  }
  div.innerHTML = `
        <p class="header"> Tu resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold"> Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold"> Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold"> Total: $ <span class="font-normal">${precio}</span></p>
    `;
  const resultado = document.querySelector("#resultado");
  resultado.appendChild(div);
};
//INSTANCIAMOS OBJETOS
const ui = new UI();

//ESCUCHA DE EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

iniciarEventListeners();
function iniciarEventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", validarFormulario);
}

//FUNCIONES
function validarFormulario(evento) {
  evento.preventDefault();

  //OBTENGO DATOS DEL CAMPO MARCA
  const marca = document.querySelector("#marca").value;
  //OBTENGO DATOS DEL CAMPO ANIO
  const year = document.querySelector("#year").value;

  //OBTENGO DATOS DEL CAMPO TIPO
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //VALIDANDO
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  } else {
    ui.mostrarMensaje("Cotizando...", "correcto");
    //INSTANCIAR OBJETO COTIZACION
    const vehiculo = new cotizacionSeguro(marca, year, tipo);
    //UTILIZAR PROTO PARA COTIZAR SEGURO
    const total = vehiculo.cotizar();
    //Mostrar resumen
    //Mostrar spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    const resultadoDiv = document.querySelector("#resultado div");
    if (resultadoDiv !== null) {
      resultadoDiv.remove();
    }
    setTimeout(() => {
      spinner.style.display = "none";
      ui.mostrarResumen(vehiculo, total);
    }, 3000);
  }
}
