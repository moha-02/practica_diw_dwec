//Obtengo el span del html en el que introducire el numero de articulos que el usuario tiene
const contadorArticulos = document.querySelector("#contadorArticulos");

//Obtengo el usuario logueado
const logued = localStorage.getItem("User");

//Obtengo el carro del Usario
var carro = JSON.parse(localStorage.getItem("Carro" + logued));

function contadorCarro() {
  console.log("desde carro");
  if (carro.length > 0) {
    contadorArticulos.removeAttribute("hidden");
    contadorArticulos.innerHTML = carro.length;
  } else {
    contadorArticulos.setAttribute("hidden", "true");
  }
}
setInterval(contadorCarro, 1000);
