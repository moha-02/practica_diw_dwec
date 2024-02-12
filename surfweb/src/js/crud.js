const divLogReg = document.querySelector("#navloginRegister");
const divLogued = document.querySelector("#navlogued");
const usuarioInicio = document.querySelector("#usuarioInicio");
const btnCerrarsession = document.querySelector("#cerrarSession");

//Boton de loguarse
const login = document.querySelector("#buttonSignin");
if (login) {
  login.addEventListener("click", checkLoguin);
}

//Boton de registarse
const registerCreate = document.querySelector("#buttonSignup");
if (registerCreate) {
  registerCreate.addEventListener("click", insertarUser);
}

//Cerrar sesion
if (btnCerrarsession) {
  btnCerrarsession.addEventListener("click", cierreSesion);
}

//Funcion pantalla de carga
const spinnerwrapper = document.querySelector(".spinner-wrapper");

window.addEventListener("load", () => {
  spinnerwrapper.style.opacity = "0";

  setTimeout(() => {
    spinnerwrapper.style.display = "none";
  }, 3000);
});

setTimeout(() => {
  const sesion = localStorage.getItem("User");
  if (sesion) {
    usuarioInicio.innerHTML = sesion;
    divLogued.removeAttribute("hidden");
    divLogReg.setAttribute("hidden", "true");
  } else {
    divLogReg.removeAttribute("hidden");
    divLogued.setAttribute("hidden", "true");
  }
}, 100);

// Si hay un usuario , que se ponga
const user = localStorage.getItem("User");

const db = indexedDB.open("Surfweb", 1);

db.onupgradeneeded = function (ev) {
  const database = ev.target.result;

  const usuarioObjectStore = database.createObjectStore("User", {
    keyPath: "email",
  });
};

function checkLoguin() {
  const loginEmail = document.querySelector("#loginEmail").value;
  const loginPassword = document.querySelector("#loginPassword").value;

  const transaction = db.result.transaction(["User"], "readwrite");
  const userTable = transaction.objectStore("User").getAll();
  userTable.onsuccess = function (ev) {
    const user = ev.target.result;
    for (let i = 0; i < user.length; i++) {
      if (user[i].email === loginEmail && user[i].password === loginPassword) {
        localStorage.setItem("User", user[i].username);
        usuarioInicio.innerHTML = user[i].username;
        divLogReg.setAttribute("hidden", "true");
        divLogued.removeAttribute("hidden");
        location.reload();
        break;
      }
    }
  };
}

function insertarUser() {
  const username = document.querySelector("#registerUsername").value;
  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;
  const passwordConfirm = document.querySelector(
    "#registerPasswordConfirm"
  ).value;

  //Validación

  if (
    username != "" &&
    isValidEmail(email) &&
    password === passwordConfirm &&
    password != ""
  ) {
    const transaction = db.result.transaction(["User"], "readwrite");
    transaction.objectStore("User").add({
      email: email,
      username: username,
      password: password,
    });
    localStorage.setItem("User", username);
    usuarioInicio.innerHTML = username;
    divLogReg.setAttribute("hidden", "true");
    divLogued.removeAttribute("hidden");
    location.reload();
  }
}

//Pattern para el email

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^@\s]+$/;
  return emailRegex.test(email);
}

//Para cerrar sesion

function cierreSesion() {
  localStorage.removeItem("User");
  divLogReg.removeAttribute("hidden");
  divLogued.setAttribute("hidden", "true");
  window.location.href = "../index.html";
}

//Eliminar usuario

const btnBorrarPerfil = document.querySelector("#btnBorrarCuenta");

if (btnBorrarPerfil) {
  btnBorrarPerfil.addEventListener("click", borrarCuenta);
}

function borrarCuenta() {
  const logued = localStorage.getItem("User");

  //Elimino el usuario del IndexDB
  const transaction = db.result.transaction(["User"], "readwrite");
  const userTable = transaction.objectStore("User").getAll();
  userTable.onsuccess = function (ev) {
    const user = ev.target.result;
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === logued) {
        console.log(logued);
        console.log(user[i].username);
        transaction.objectStore("User").delete(user[i].email);
        break;
      }
    }
  };
  //Elimino su carro de compra del localStorage
  localStorage.removeItem("Carro" + logued);
  // Lo quito de la sesion
  localStorage.setItem("User", "");
  //Me dirijo a la pantalla de inicio
  window.location.href = "../index.html";
}

//Update usuario

function actualizarCuenta() {
  //obtengo el valor del input
  var newUsername = document.querySelector("#inputCambioUsername").value;
  console.log(newUsername);
  const logued = localStorage.getItem("User");
  //Obtengo el carro del Usario
  var carro = JSON.parse(localStorage.getItem("Carro" + logued));
  //Elimino el carro porque lo vamos a actualizar
  localStorage.removeItem("Carro" + logued);

  //Edito el usuario del IndexDB
  const transaction = db.result.transaction(["User"], "readwrite");
  const userTable = transaction.objectStore("User").getAll();
  userTable.onsuccess = function (ev) {
    const user = ev.target.result;
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === logued) {
        transaction.objectStore("User").put({
          email: user[i].email,
          username: newUsername,
          password: user[i].password,
        });
        break;
      }
    }
  };
  //Pongo el logued actualizado
  localStorage.setItem("User", newUsername);
  //Subo el carro al locastorage,Actulizado
  localStorage.setItem("Carro" + newUsername, JSON.stringify(carro));

  window.location.href = "../index.html";
}

//Editar boton usuario
const btnActualizarUser = document.querySelector("#btnActualizarCuenta");
if (btnActualizarUser) {
  btnActualizarUser.addEventListener("click", actualizarCuenta);
}

//Ponser el valor en el input del usuario que esta logueado
function obtenerInputEdit() {
  const logued = localStorage.getItem("User");
  //obtengo el input
  const inputEdit = document.querySelector("#inputCambioUsername");

  inputEdit.value = logued;
}

//Obtención del input
const btnEdit = document.querySelector("#btnEditar");
if (btnEdit) {
  btnEdit.addEventListener("click", obtenerInputEdit);
}
