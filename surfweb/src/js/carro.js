//Obtengo el span del html en el que introducire el numero de articulos que el usuario tiene
const contadorArticulos = document.querySelector("#contadorArticulos");

//Obtengo el usuario logueado
const logued = localStorage.getItem("User");

//Obtengo el carro del Usario
var carro = JSON.parse(localStorage.getItem("Carro" + logued));

function contadorCarro() {
  if (carro.length > 0) {
    contadorArticulos.removeAttribute("hidden");
    contadorArticulos.innerHTML = carro.length;
  } else {
    contadorArticulos.setAttribute("hidden", "true");
  }
}
//Cadd 1seg se ejecuta la función
setInterval(contadorCarro, 1000);

//Manejo de los items de la tienda
function carrito() {
  //Div del carrito
  var divCarro = document.querySelector("#divCarro");

  // Quitamos lo que habia en el carro para que no se duplique
  divCarro.innerHTML = "";

  //Obtengo el usuario logueado
  const User = localStorage.getItem("User");
  //Obtengo su cesta
  const cestaUsuario = JSON.parse(localStorage.getItem("Carro" + logued));

  const contadores = {};

  // Contar la cantidad de veces que aparece cada objeto único
  cestaUsuario.forEach((articulo) => {
    const articuloString = JSON.stringify(articulo);
    contadores[articuloString] = (contadores[articuloString] || 0) + 1;
  });

  // Utilizo un conjunto para obtener objetos únicos
  const conjuntoArticulosUnicos = new Set(cestaUsuario.map(JSON.stringify));

  // Converto el conjunto nuevamente a un array
  const arrayArticulosUnicos = Array.from(conjuntoArticulosUnicos).map(
    JSON.parse
  );

  //Creacion de las cards

  for (i in arrayArticulosUnicos) {
    // Crear los elementos
    const cardDiv = document.createElement("div");
    cardDiv.className = "card mb-3";
    cardDiv.style.maxWidth = "540px";

    const rowDiv = document.createElement("div");
    rowDiv.className = "row g-0";

    const colImgDiv = document.createElement("div");
    colImgDiv.className = "col-md-4";

    const img = document.createElement("img");
    img.src = "../assets/store/" + arrayArticulosUnicos[i].img;
    img.className = "img-fluid rounded-start";

    const colInfoDiv = document.createElement("div");
    colInfoDiv.className = "col-md-8";

    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = arrayArticulosUnicos[i].nombre;

    const p = document.createElement("p");
    p.className = "card-text";
    p.textContent = arrayArticulosUnicos[i].precio;

    const divBotones = document.createElement("div");
    divBotones.className = "d-flex justify-content-evenly";

    const btnMenos = document.createElement("button");
    btnMenos.type = "button";
    btnMenos.className = "btn btn-danger btn-sm btnMenos";
    btnMenos.textContent = "-";

    const spanCantidad = document.createElement("span");
    spanCantidad.innerHTML =
      "<strong>" +
      contadores[JSON.stringify(arrayArticulosUnicos[i])] +
      "</strong>";

    const btnMas = document.createElement("button");
    btnMas.type = "button";
    btnMas.className = "btn btn-info btn-sm btnMas";
    btnMas.textContent = "+";

    //Agrego los elementos al DOM
    colImgDiv.appendChild(img);
    colInfoDiv.appendChild(cardBodyDiv);
    cardBodyDiv.appendChild(h5);
    cardBodyDiv.appendChild(p);
    cardBodyDiv.appendChild(divBotones);
    divBotones.appendChild(btnMenos);
    divBotones.appendChild(spanCantidad);
    divBotones.appendChild(btnMas);

    rowDiv.appendChild(colImgDiv);
    rowDiv.appendChild(colInfoDiv);
    cardDiv.appendChild(rowDiv);

    //Meto el articulo en el carro
    divCarro.appendChild(cardDiv);
  }
}

// La funcion se ejecuta cuando se pulse el boton del carro asi que , me traigo el boton y le añado un listener

const btnCarro = document.querySelector("#btnCarrito");
btnCarro.addEventListener("click", carrito);
