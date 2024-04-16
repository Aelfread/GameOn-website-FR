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
listBtnRadio[0].checked = true;
labelCheckbox1.checked = true;
labelCheckbox1.required = true;
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
  if (!isValidInput(first) || !isValidInput(last)) {
    if (!isValidInput(first)) {
      alert("Le champ first doit être rempli");
      console.log("Le champ first doit être rempli");
    }
    if (!isValidInput(last)) {
      alert("Le champ last doit être rempli");
      console.log("Le champ last doit être rempli");
    }
    /*alert("Les champs first et last doivent être remplis");
    console.log("Les champs first et last doivent être remplis");*/
  }
  if (!isValidEmail(email)) {
    alert("L'email doit être valide");
    console.log("L'email doit être valide");
  }
  if (!isNumber(quantity)) {
    alert("La quantité doit être comprise entre 0 et 99");
    console.log("La quantité doit être comprise entre 0 et 99");
  }
  console.log(first.value);
  console.log(last.value);
  console.log(email.value);
  console.log(birthdate.value);
  console.log(quantity.value);
  for (let i = 0; i < listBtnRadio.length; i++) {
    if (listBtnRadio[i].checked) {
      console.log(listBtnRadio[i].value);
    }
  }
  console.log(labelCheckbox1.checked);
  /*closeModal();*/
});

// validate form (if all fields are empty)
function validate() {
  if (
    first.value === "" ||
    last.value === "" ||
    email.value === "" ||
    birthdate.value === "" ||
    quantity.value === ""
  ) {
    alert("Tous les champs doivent être remplis");
    console.log("Tous les champs doivent être remplis");
    return false;
  } else {
    return true;
  }
}

function isValidInput(input) {
  const regex = new RegExp("^[a-z]{2,}$");
  if (regex.test(input.value)) {
    console.log("Input valid");
  } else {
    console.log("Input not valid");
  }
  return regex.test(input.value);
}

function isValidEmail(emailInput) {
  const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]+$");
  if (emailRegex.test(emailInput.value)) {
    console.log("Email valid");
  } else {
    console.log("Email not valid");
  }
  return emailRegex.test(emailInput.value);
}

function isNumber(numberInput) {
  const numberRegex = new RegExp("^(?:[0-9]|[1-9][0-9])$");
  if (numberRegex.test(numberInput.value)) {
    console.log("Number valid");
  } else {
    console.log("Number not valid");
  }
  return numberRegex.test(numberInput.value);
}
