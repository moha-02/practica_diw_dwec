import "../bootstrap-5.3.2/scss/bootstrap.scss";
import "../bootstrap-5.3.2/scss/bootstrap-utilities.scss";
import "../bootstrap-5.3.2/scss/bootstrap-reboot.scss";
import "../bootstrap-5.3.2/scss/bootstrap-grid.scss";
import "./crud";

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
