//Register validación

document.getElementById("registrationForm").addEventListener(
  "submit",
  function (event) {
    var username = document.getElementById("registerUsername");
    var email = document.getElementById("registerEmail");
    var password = document.getElementById("registerPassword");
    var confirmPassword = document.getElementById("registerPasswordConfirm");

    // Validación Username
    if (!username.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      username.classList.add("is-invalid");
    } else {
      username.classList.remove("is-invalid"); // Quita la clase is-invalid si es válido
      username.classList.add("was-validated");
    }

    // Validación Email
    if (!email.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("was-validated");
    }

    // Validación password
    if (!password.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      password.classList.add("is-invalid");
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("was-validated");
    }

    // Validación de la confirmación del password
    if (password.value !== confirmPassword.value) {
      event.preventDefault();
      event.stopPropagation();
      confirmPassword.classList.add("is-invalid");
    } else {
      confirmPassword.classList.remove("is-invalid");
      confirmPassword.classList.add("was-validated");
    }

    // Añade la clase was-validated a todos los campos para confirmarlos
    email.classList.add("was-validated");
    password.classList.add("was-validated");
    confirmPassword.classList.add("was-validated");
  },
  false
);

//Controladores
document
  .getElementById("registerUsername")
  .addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });

document.getElementById("registerEmail").addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

document
  .getElementById("registerPassword")
  .addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });

document
  .getElementById("registerPasswordConfirm")
  .addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });

//Login validación
document.getElementById("loginForm").addEventListener(
  "submit",
  function (event) {
    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");

    if (!email.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("was-validated");
    }

    if (!password.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      password.classList.add("is-invalid");
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("was-validated");
    }

    email.classList.add("was-validated");
    password.classList.add("was-validated");
  },
  false
);

document.getElementById("loginEmail").addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

document.getElementById("loginPassword").addEventListener("input", function () {
  this.classList.remove("is-invalid");
});

//Confirmación del password
var registerPassword = document.getElementById("registerPassword");
var registerPasswordConfirm = document.getElementById(
  "registerPasswordConfirm"
);

function validatePassword() {
  if (registerPassword.value != registerPasswordConfirm.value) {
    registerPasswordConfirm.setCustomValidity("Passwords Don´t Match");
  } else {
    registerPasswordConfirm.setCustomValidity("");
  }
}

registerPassword.onchange = validatePassword;
registerPasswordConfirm.onkeyup = validatePassword;
