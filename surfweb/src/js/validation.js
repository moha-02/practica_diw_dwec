document.getElementById("registrationForm").addEventListener(
  "submit",
  function (event) {
    var username = document.getElementById("registerUsername");
    var email = document.getElementById("registerEmail");
    var password = document.getElementById("registerPassword");
    var confirmPassword = document.getElementById("registerPasswordConfirm");

    // Validación del nombre de usuario
    if (!username.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      username.classList.add("is-invalid");
    } else {
      username.classList.remove("is-invalid"); // Quita la clase is-invalid si es válido
      username.classList.add("was-validated"); // Añade la clase was-validated
    }

    // Validación del correo electrónico
    if (!email.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      email.classList.add("is-invalid");
    } else {
      email.classList.remove("is-invalid"); // Quita la clase is-invalid si es válido
      email.classList.add("was-validated"); // Añade la clase was-validated
    }

    // Validación de la contraseña
    if (!password.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      password.classList.add("is-invalid");
    } else {
      password.classList.remove("is-invalid"); // Quita la clase is-invalid si es válido
      password.classList.add("was-validated"); // Añade la clase was-validated
    }

    // Validación de la confirmación de contraseña
    if (password.value !== confirmPassword.value) {
      event.preventDefault();
      event.stopPropagation();
      confirmPassword.classList.add("is-invalid");
    } else {
      confirmPassword.classList.remove("is-invalid"); // Quita la clase is-invalid si es válido
      confirmPassword.classList.add("was-validated"); // Añade la clase was-validated
    }

    // Añade la clase was-validated a todos los campos
    email.classList.add("was-validated");
    password.classList.add("was-validated");
    confirmPassword.classList.add("was-validated");
  },
  false
);

// Controlador de eventos para quitar la clase is-invalid cuando el usuario empieza a escribir en el campo
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
