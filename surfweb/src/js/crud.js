const db = indexedDB.open("Surfweb", 1);

db.onupgradeneeded = function (ev) {
  const database = ev.target.result;

  const usuarioObjectStore = database.createObjectStore("User", {
    keyPath: "email",
  });

  usuarioObjectStore.createIndex("username", "username");
  usuarioObjectStore.createIndex("password", "password");
};

function create() {
  const username = document.querySelector("#registerUsername").value;
  const email = document.querySelector("#registerEmail").value;
  const password = document.querySelector("#registerPassword").value;

  const transaction = db.result.transaction(["User"], "readwrite");
  transaction.objectStore("User").add({
    email: email,
    username: username,
    password: password,
  });
}
