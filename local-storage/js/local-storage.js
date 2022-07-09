//VARIABLES
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//ESCUCHANDO EVENTOS
document.addEventListener("DOMContentLoaded", () => {
  iniciarEventListeners();
  tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  mostrarHTML();
});

function iniciarEventListeners() {
  formulario.addEventListener("submit", cargarDatos);

  //PARA BORRAR TWEETS
  listaTweets.addEventListener("click", borrarTweet);
}

//FUNCIONES
function obtenerDatos(campo) {
  if (campo !== "") {
    const tweetObj = {
      id: Date.now(),
      tweet: campo,
    };
    tweets = [...tweets, tweetObj];
  } else {
    mostrarError();
    tweets = [...tweets];
  }
}

function cargarDatos(evento) {
  evento.preventDefault();
  const datos = document.querySelector("#tweet").value;
  obtenerDatos(datos);
  //Guardamos los tweets en local storage
  mostrarHTML();
  formulario.reset();
}

function mostrarHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Crear boton de borrar
      const botonBorrar = document.createElement("a");
      botonBorrar.classList.add("borrar-tweet");
      botonBorrar.innerText = "X";
      //Crear li
      const nuevoTweet = document.createElement("li");
      nuevoTweet.innerText = tweet.tweet;
      nuevoTweet.dataset.tweetId = tweet.id;
      nuevoTweet.appendChild(botonBorrar);

      listaTweets.appendChild(nuevoTweet);
    });
  }
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function borrarTweet(evento) {
  evento.preventDefault();
  const id = evento.target.parentElement.dataset.tweetId;
  tweets = tweets.filter((tweet) => tweet.id != id);
  mostrarHTML();
}

function mostrarError() {
  if (formulario.lastChild.nodeName === "#text") {
    const mensajeError = document.createElement("p");
    mensajeError.innerText = "No puede publicar un tweet vacio";
    mensajeError.classList.add("error");
    formulario.appendChild(mensajeError);
    setTimeout(() => {
      mensajeError.remove();
    }, 3000);
  }
}
