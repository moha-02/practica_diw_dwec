import "../bootstrap-5.3.2/scss/bootstrap.scss";
import "../bootstrap-5.3.2/scss/bootstrap-utilities.scss";
import "../bootstrap-5.3.2/scss/bootstrap-reboot.scss";
import "../bootstrap-5.3.2/scss/bootstrap-grid.scss";
import "../scss/styles.scss";
import "./weather";
import "./crud";
import "./productos";
import "./carro";


//Validacion formulario registro
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

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
