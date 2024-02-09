const divTienda = document.querySelector("#divTienda");

const btnTodos = document.querySelector("#btnTodos");
btnTodos.addEventListener("click", getAllArticulos);

const btnTabla = document.querySelector("#btnTablas");
btnTabla.addEventListener("click", getTablas);

const btnNeoprenos = document.querySelector("#btnNeoprenos");
btnNeoprenos.addEventListener("click", getNeoprenos);

const btnBodyboards = document.querySelector("#btnBodyboards");
btnBodyboards.addEventListener("click", getBodyboards);

const btnAccesorios = document.querySelector("#btnAccesorios");
btnAccesorios.addEventListener("click", getAccesorios);

const btnLifestyle = document.querySelector("#btnLifestyle");
btnLifestyle.addEventListener("click", getLifetyle);
const articulos = [
  {
    img: "bodyboard1.jpg",
    nombre: "Bodyboard Paipo Naranaja",
    precio: "50$",
    tipo: "bodyboard",
  },
  {
    img: "tabla2.jpg",
    nombre: "Tabla de Surf Saona",
    precio: "455.90$",
    tipo: "tabla",
  },
  {
    img: "life1.webp",
    nombre: "Sudadera Grow it Local",
    precio: "90$",
    tipo: "life",
  },
  {
    img: "neo1.jpg",
    nombre: "Neopreno Kynay",
    precio: "150$",
    tipo: "neopreno",
  },
  {
    img: "tabla1.jpg",
    nombre: "Tabla de Surf Full&Cas",
    precio: "299$",
    tipo: "tabla",
  },
  {
    img: "bodyboard2.jpg",
    nombre: "Bodyboard Paipo Amarillo",
    precio: "50$",
    tipo: "bodyboard",
  },
  {
    img: "tabla3.jpg",
    nombre: "Tabla de Surf Olaian",
    precio: "350,99$",
    tipo: "tabla",
  },
  {
    img: "accesorio2.jpg",
    nombre: "Leash FCS",
    precio: "39$",
    tipo: "accesorio",
  },
  {
    img: "bodyboard3.jpg",
    nombre: "Bodyboard Osprey 40",
    precio: "75$",
    tipo: "bodyboard",
  },
  {
    img: "accesorio1.avif",
    nombre: "Leashe Olaian",
    precio: "30$",
    tipo: "accesorio",
  },
  {
    img: "life3.webp",
    nombre: "Camiseta Palmera Surf",
    precio: "80$",
    tipo: "life",
  },
  {
    img: "tabla4.jpg",
    nombre: "Tabla de Surf Feel Surf",
    precio: "600$",
    tipo: "tabla",
  },
  {
    img: "accesorio3.webp",
    nombre: "Pads Surf Sunset",
    precio: "40$",
    tipo: "accesorio",
  },
  {
    img: "life4.webp",
    nombre: "Camiseta Yes to Surf",
    precio: "58$",
    tipo: "life",
  },
  {
    img: "accesorio4.webp",
    nombre: "Pad Surf Waikiki",
    precio: "39,99$",
    tipo: "accesorio",
  },
  {
    img: "neo2.jpg",
    nombre: "Neopreno Selano",
    precio: "200$",
    tipo: "neopreno",
  },
  {
    img: "life2.webp",
    nombre: "Vamos Pal Agua Camiseta Surf Mujer Sostenible",
    precio: "33$",
    tipo: "life",
  },
  {
    img: "tabla5.jpg",
    nombre: "Tabla de Surf Tools Surfboards",
    precio: "230$",
    tipo: "tabla",
  },
  {
    img: "accesorio5.jpg",
    nombre: "Funda tabla Radz",
    precio: "90$",
    tipo: "accesorio",
  },
  {
    img: "neo3.jpg",
    nombre: "Neopreno Selano",
    precio: "110$",
    tipo: "neopreno",
  },
  {
    img: "accesorio6.jpg",
    nombre: "Funda Surf Creatures of Leisure",
    precio: "50$",
    tipo: "accesorio",
  },
  {
    img: "neo4.jpg",
    nombre: "Neopreno Mujer",
    precio: "109$",
    tipo: "neopreno",
  },
  {
    img: "accesorio7.jpg",
    nombre: "Quilla Surf Feather",
    precio: "70$",
    tipo: "accesorio",
  },
];

//Creo base de datos y voy metiendo los productos en el
let request = indexedDB.open("Articulos", 4);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore("Tienda", {
    keyPath: "img",
  });
  objectStore.createIndex("tipo", "tipo", { unique: false });

  objectStore.transaction.oncomplete = function (evento) {
    let articulosObjectStore = db
      .transaction("Tienda", "readwrite")
      .objectStore("Tienda");
    for (let i in articulos) {
      articulosObjectStore.add(articulos[i]);
    }
  };
};

function getAllArticulos() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  tipoArticulos.getAll().onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

//Tablas

function getTablas() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  console.log(tipoArticulos);
  tipoArticulos.getAll("tabla").onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

//Neoprenos

function getNeoprenos() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  console.log(tipoArticulos);
  tipoArticulos.getAll("neopreno").onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

//Bodyboards

function getBodyboards() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  console.log(tipoArticulos);
  tipoArticulos.getAll("bodyboard").onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

//Accesorios

function getAccesorios() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  console.log(tipoArticulos);
  tipoArticulos.getAll("accesorio").onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

function getLifetyle() {
  divTienda.innerHTML = "";
  const transaction = request.result.transaction(["Tienda"], "readwrite");
  const tipoArticulos = transaction.objectStore("Tienda").index("tipo");
  console.log(tipoArticulos);
  tipoArticulos.getAll("life").onsuccess = function (ev) {
    const tablas = ev.target.result;
    for (let i in tablas) {
      console.log(tablas);

      // Crear los elementos
      let colDiv = document.createElement("div");
      let cardDiv = document.createElement("div");
      let bgImageDiv = document.createElement("div");
      let img = document.createElement("img");
      let cardBodyDiv = document.createElement("div");
      let h5 = document.createElement("h5");
      let p = document.createElement("p");
      let a = document.createElement("a");
      // Añadir las clases y otros atributos
      colDiv.setAttribute("class", "col");
      cardDiv.setAttribute("class", "card h-60 mt-3");
      bgImageDiv.setAttribute("class", "bg-image hover-overlay");
      bgImageDiv.setAttribute("data-mdb-ripple-init", "");
      bgImageDiv.setAttribute("data-mdb-ripple-color", "light");
      img.setAttribute("src", "../assets/store/" + tablas[i].img);
      img.setAttribute("class", "card-img-top");
      img.setAttribute("height", "300");
      cardBodyDiv.setAttribute("class", "card-body border border-info");
      h5.setAttribute("class", "card-title");
      a.setAttribute("href", "#!");
      a.setAttribute("class", "btn btn-primary btnPushCarro");
      a.setAttribute("data-mdb-ripple-init", "");

      h5.textContent = tablas[i].nombre;
      p.textContent = tablas[i].precio;
      a.textContent = "Añadir al carro";

      //Añadimos los elementos
      bgImageDiv.appendChild(img);
      cardBodyDiv.appendChild(h5);
      cardBodyDiv.appendChild(p);
      cardBodyDiv.appendChild(a);
      cardDiv.appendChild(bgImageDiv);
      cardDiv.appendChild(cardBodyDiv);
      colDiv.appendChild(cardDiv);

      divTienda.appendChild(colDiv);
    }
  };
}

// Añadir articulo al carro
const btnComprar = document.querySelectorAll(".btnPushCarro");
btnComprar.forEach((btn) => {
  btn.addEventListener("click", anadirCarro);
});

// Añadir al carro
function anadirCarro(event) {
  const logued = localStorage.getItem("User");
  // Acceso al botón clicado
  const btn = event.target;
  // Accedo al elemento card que contiene el botón clicado
  const card = btn.parentElement;

  // Accedo al título dentro del card
  const nombreArticulo = card.querySelector("h5");
  // Obtengo el título
  const textArticulo = nombreArticulo.textContent;

  var carro = JSON.parse(localStorage.getItem("Carro" + logued)) || [];

  // Llamada a la función getArticulo que ahora devuelve una promesa
  getArticulo(textArticulo).then((articulo) => {
    carro.push(articulo);
    //Añado el articulo en el localstorage.Me aseguro que es el caro del usuario
    localStorage.setItem("Carro" + logued, JSON.stringify(carro));
  });
}

// Obtener el artículo del IndexDB
function getArticulo(articulo) {
  return new Promise((resolve, reject) => {
    const transaction = request.result.transaction(["Tienda"], "readwrite");
    const tipoArticulos = transaction.objectStore("Tienda").index("tipo");

    tipoArticulos.getAll().onsuccess = function (ev) {
      const tablas = ev.target.result;
      for (let i in tablas) {
        if (tablas[i].nombre === articulo) {
          resolve(tablas[i]);
          return;
        }
      }
      // Si no se encuentra el artículo, rechazar la promesa
      reject(new Error("Artículo no encontrado"));
    };
  });
}
