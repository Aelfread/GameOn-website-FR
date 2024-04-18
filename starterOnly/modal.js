function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelector(".close");
const form = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const listBtnRadio = document.querySelectorAll("input[name='location']");
/*const listBtnCheckbox = document.querySelectorAll("input[type='checkbox']");*/
const labelCheckbox1 = document.getElementById("checkbox1");
const labelCheckbox2 = document.getElementById("checkbox2");
const message = document.getElementById("thanks-register");
//listBtnRadio.checked = false;
//labelCheckbox1.checked = true;
message.style.display = "none";
// Functions
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// submit form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  isCheckedCheckbox();
  isBirthdateValid(birthdate);
  console.log(first.value);
  console.log(last.value);
  console.log(email.value);
  console.log(birthdate.value);
  console.log(quantity.value);
  /*for (let i = 0; i < listBtnRadio.length; i++) {
    if (listBtnRadio[i].checked) {
      console.log(listBtnRadio[i].value);
    }
  }*/
  console.log(labelCheckbox1.checked);
  /*closeModal();*/
  addFirstErrorMessage(first);
  addLastErrorMessage(last);
  addEmailErrorMessage(email);
  addQuantityErrorMessage(quantity);
  addBirthdateErrorMessage(birthdate);
  addRadioErrorMessage(listBtnRadio);
  addCheckboxErrorMessage(labelCheckbox1);
  if (validate()) {
    clearForm();
    closeModal();
    console.log("Form submitted");
    alert("Form submitted");
  }
});

function clearForm(input) {
  form.style.display = "none";
  message.style.display = "flex";
  message.textContent = "Merci ! Votre réservation a été reçue.";
  setTimeout(() => {
    form.style.display = "block";
    message.style.display = "none";
    form.reset();
  }, 5000);
}

function isCheckedRadios() {
  for (let i = 0; i < listBtnRadio.length; i++) {
    if (listBtnRadio[i].checked) {
      console.log(listBtnRadio[i].value);
      return true;
    }
  }
  return false;
}
// validate form (if all fields are empty)
function validate() {
  if (
    first.value === "" ||
    last.value === "" ||
    email.value === "" ||
    birthdate.value === "" ||
    quantity.value === "" ||
    listBtnRadio.checked === false ||
    labelCheckbox1.checked === false
  ) {
    alert("Tous les champs doivent être remplis");
    console.log("Tous les champs doivent être remplis");
    //return false;
  } else if (
    isValidInput(first) &&
    isValidInput(last) &&
    isValidEmail(email) &&
    isBirthdateValid(birthdate) &&
    isNumber(quantity) &&
    isCheckedCheckbox() &&
    isCheckedRadios()
  ) {
    console.log("Form valid");
    return true;
  } else {
    console.log("Form not valid");
    return false;
  }
}

// check if input is valid
function isValidInput(input) {
  const regex = new RegExp("^[a-z]{2,}$");
  if (regex.test(input.value)) {
    console.log("Input valid");
    first.parentElement.dataset.errorVisible = "false";
    last.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Input not valid");
    first.parentElement.dataset.errorVisible = "true";
    last.parentElement.dataset.errorVisible = "true";
  }
  return regex.test(input.value);
}

// check if email is valid
function isValidEmail(emailInput) {
  const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]+$");
  if (emailRegex.test(emailInput.value)) {
    console.log("Email valid");
    email.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Email not valid");
    email.parentElement.dataset.errorVisible = "true";
  }
  return emailRegex.test(emailInput.value);
}

// check if quantity is valid
function isNumber(numberInput) {
  const numberRegex = new RegExp("^(?:[0-9]|[1-9][0-9])+$");
  if (numberRegex.test(numberInput.value)) {
    console.log("Number valid");
    quantity.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Number not valid");
    quantity.parentElement.dataset.errorVisible = "true";
  }
  return numberRegex.test(numberInput.value);
}

function isBirthdateValid(input) {
  const date = new Date(input.value);
  if (isNaN(date)) {
    birthdate.parentElement.dataset.errorVisible = "true";
    console.log("Date not valid");
    return false;
  }
  birthdate.parentElement.dataset.errorVisible = "false";
  console.log("Date valid");
  return true;
}
function isCheckedCheckbox() {
  if (labelCheckbox1.checked) {
    console.log("Checkbox checked");
    return true;
  } else {
    console.log("Checkbox not checked");
    //labelCheckbox1.required = true;
    return false;
  }
}

//add error message for uncheck terms & conditions
function addCheckboxErrorMessage() {
  if (!labelCheckbox1.checked) {
    //don't repeat the same error message
    if (labelCheckbox1.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    errorMessage.innerText =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    labelCheckbox1.parentNode.insertBefore(errorMessage, labelCheckbox2);
    console.log(labelCheckbox1.parentNode.querySelector(".data-error"));
  } else {
    if (labelCheckbox1.parentNode.querySelector(".data-error")) {
      labelCheckbox1.parentNode.querySelector(".data-error").remove();
    }
  }
}

function addBirthdateErrorMessage(input) {
  if (!isBirthdateValid(input)) {
    //don't repeat the same error message
    if (input.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    errorMessage.innerText = "Vous devez entrer votre date de naissance.";
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

//add error message for quantity below the input of quantity
function addQuantityErrorMessage(input) {
  if (isNumber(input) < 1 || isNumber(input) > 99 || isNumber(input) == "") {
    //don't repeat the same error message
    if (input.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    errorMessage.innerText =
      "Le nombre de tournois auquels vous avez participer doit être comprise entre 0 et 99";
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

// add error message for email below the input of email
function addEmailErrorMessage(input) {
  if (!isValidEmail(input)) {
    //don't repeat the same error message
    if (input.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    errorMessage.innerText =
      "Veuillez entrer une adresse email valide. ex: JohnDoe6@example.com";
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

// add error message for first below the input of first
function addFirstErrorMessage(input) {
  if (!isValidInput(input)) {
    //don't repeat the same error message
    if (input.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");

    errorMessage.classList.add("data-error");
    errorMessage.innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

// add error message for last below the input of last
function addLastErrorMessage(input) {
  if (!isValidInput(input)) {
    //don't repeat the same error message
    if (input.parentNode.querySelector(".data-error")) return;
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    errorMessage.innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

//add error message for listBtnRadio below the input of listBtnRadio
function addRadioErrorMessage(inputs) {
  inputs.forEach((input) => {
    //for (let i = 0; i < listBtnRadio.length; i++) {
    if (!isCheckedRadios()) {
      //const input = listBtnRadio[i];
      //don't repeat the same error message
      if (input.parentNode.querySelector(".data-error")) return;
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("data-error");
      errorMessage.innerText =
        "Veuillez sélectionner le tournoi que vous souhaitez participer";
      input.parentNode.insertBefore(errorMessage, input.lastChild);
      console.log(input.parentNode.querySelector(".data-error"));
    } /*else {
      if (input.parentNode.querySelector(".data-error")) {
        input.parentNode.querySelector(".data-error").remove();
      }
    }/*/
    //}
  });

  const form = inputs[0].closest("form");
  form.addEventListener("change", (event) => {
    if (isCheckedRadios()) {
      inputs.forEach((input) => {
        const errorMessage = input.parentNode.querySelector(".data-error");
        if (errorMessage) {
          errorMessage.remove();
        }
      });
    }
  });
}

/*function addRadioErrorMessage() {
  for (let i = 0; i < listBtnRadio.length; i++) {
    if (!listBtnRadio[i].checked) {
      const input = listBtnRadio[i];
      // Don't repeat the same error message
      if (input.parentNode.querySelector(".data-error")) return;
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("data-error");
      errorMessage.innerText = "La liste doit être remplie";
      input.parentNode.insertBefore(errorMessage, input.nextSibling);
      console.log(input.parentNode.querySelector(".data-error"));
    } else {
      const input = listBtnRadio[i];
      if (input.parentNode.querySelector(".data-error")) {
        input.parentNode.querySelector(".data-error").remove();
      }
    }
  }
}*/

// add error message
first.addEventListener("change", () => {
  addFirstErrorMessage(first);
});
last.addEventListener("change", () => {
  addLastErrorMessage(last);
});
quantity.addEventListener("change", () => {
  addQuantityErrorMessage(quantity);
});
email.addEventListener("change", () => {
  addEmailErrorMessage(email);
});
labelCheckbox1.addEventListener("change", () => {
  addCheckboxErrorMessage(labelCheckbox1);
});
birthdate.addEventListener("change", () => {
  addBirthdateErrorMessage(birthdate);
});

/*for (let i = 0; i < listBtnRadio.length; i++) {
  listBtnRadio[i].addEventListener("click", () => {
    addRadioErrorMessage(listBtnRadio[i]);
  });
}*/
