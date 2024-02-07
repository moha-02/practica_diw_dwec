const divLogReg = document.querySelector("#navloginRegister");
const divLogued = document.querySelector("#navlogued");
const usuarioInicio = document.querySelector("#usuarioInicio");

//Boton de loguarse

const login = document.querySelector("#buttonSignin");
login.addEventListener("click", checkLoguin);
//Boton de registarse
const registerCreate = document.querySelector("#buttonSignup");
registerCreate.addEventListener("click", insertarUser);

// Si hay un usuario , que se ponga
const user = localStorage.getItem("User");
usuarioInicio.innerHTML = user;

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
    console.log("Hola");
    for (let i = 0; i < user.length; i++) {
      console.log("Hola");
      if (user[i].email === loginEmail && user[i].password === loginPassword) {
        localStorage.setItem("User", user[i].username);
        divLogReg.setAttribute("hidden", "true");
        divLogued.removeAttribute("hidden");
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
    divLogReg.setAttribute("hidden", "true");
    divLogued.removeAttribute("hidden");
  }
}

//Pattern para el email

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^@\s]+$/;
  return emailRegex.test(email);
}
