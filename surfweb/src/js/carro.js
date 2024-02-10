//Obtengo el span del html en el que introducire el numero de articulos que el usuario tiene
const contadorArticulos = document.querySelector("#contadorArticulos");

//Obtengo el usuario logueado
const logued = localStorage.getItem("User");

//Obtengo el carro del Usario
var carro = JSON.parse(localStorage.getItem("Carro" + logued));

function contadorCarro() {
  if (!carro || carro.length === 0) {
    contadorArticulos.setAttribute("hidden", "true");
  } else {
    contadorArticulos.removeAttribute("hidden");
    contadorArticulos.innerHTML = carro.length;
  }
}
//Cadd 1seg se ejecuta la función
setInterval(contadorCarro, 1000);

const contadores = {};

// Contar la cantidad de veces que aparece cada objeto único
carro.forEach((articulo) => {
  const articuloString = JSON.stringify(articulo);
  contadores[articuloString] = (contadores[articuloString] || 0) + 1;
});

//Manejo de los items de la tienda
function carrito() {
  //Div del carrito
  var divCarro = document.querySelector("#divCarro");

  // Quitamos lo que habia en el carro para que no se duplique
  divCarro.innerHTML = "";

  // Utilizo un conjunto para obtener objetos únicos
  const conjuntoArticulosUnicos = new Set(carro.map(JSON.stringify));

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

    // Añado los event listeners para los botones menos y más
    btnMenos.addEventListener("click", quitarArticulo);
    btnMas.addEventListener("click", anadirArticulo);
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

//Funcion para añadir articulos
function anadirArticulo(evento) {
  // Acceso al botón clicado
  const btn = evento.target;
  //Acceso a la card del boton pulsado
  const card = btn.parentNode.parentNode;
  //Acceso al titulo para poder diferncairlo en el array
  const h5 = card.querySelector("h5");
  //Contenido de la etiqueta
  const nombre = h5.textContent;
  //obtengo la etiqueta donde reside el numero
  const span = card.querySelector("span");

  for (i in carro) {
    if (carro[i].nombre === nombre) {
      //Lo pongo en el array
      carro.push(carro[i]);
      //Añado el articulo en el localstorage.Me aseguro que es el caro del usuario
      localStorage.setItem("Carro" + logued, JSON.stringify(carro));
      // Incremento el contador de artículos en el span correspondiente
      contadores[JSON.stringify(carro[i])] += 1;
      span.innerHTML =
        "<strong>" + contadores[JSON.stringify(carro[i])] + "</strong>";
      //Salgo del bucle
      break;
    }
  }
}

//Funcion para quitqr articulos
function quitarArticulo(evento) {
  // Acceso al botón clicado
  const btn = evento.target;
  //Acceso a la card del boton pulsado
  const card = btn.closest(".card");
  //Acceso al titulo para poder diferncairlo en el array
  const h5 = card.querySelector("h5");
  //Contenido de la etiqueta
  const nombre = h5.textContent;
  //obtengo la etiqueta donde reside el numero
  const span = card.querySelector("span");

  for (i in carro) {
    if (carro[i].nombre === nombre) {
      //Lo pongo en el array
      carro.splice(i, 1);
      //Añado el articulo en el localstorage.Me aseguro que es el caro del usuario
      localStorage.setItem("Carro" + logued, JSON.stringify(carro));
      // Incremento el contador de artículos en el span correspondiente
      contadores[JSON.stringify(carro[i])] -= 1;
      if (contadores[JSON.stringify(carro[i])] == 0) {
        // quito la carta
        card.remove();
      } else {
        span.innerHTML =
          "<strong>" + contadores[JSON.stringify(carro[i])] + "</strong>";
      }
      //Salgo del bucle
      break;
    }
  }
}
