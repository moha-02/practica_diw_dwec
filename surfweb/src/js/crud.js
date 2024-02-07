const db = indexedDB.open("Surfweb", 1);

db.onupgradeneeded = function (ev) {
  const database = ev.target.result;

  const usuarioObjectStore = database.createObjectStore("User", {
    keyPath: "email",
  });

  usuarioObjectStore.createIndex("username", "username");
  usuarioObjectStore.createIndex("password", "password");
};

const registerCreate = document.querySelector("#buttonSignup");
registerCreate.addEventListener("click", insertarUser);

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
  }
}

//Pattern para el email

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^@\s]+$/;
  return emailRegex.test(email);
}
