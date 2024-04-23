/**
 * Toggles the navigation bar between responsive and non-responsive states.
 * It adds a "responsive" class to the element with the ID "myTopnav"
 * if it doesn't have it already, and removes it if it does.
 */
function editNav() {
  // Get the element with the ID "myTopnav"
  var x = document.getElementById("myTopnav");

  // Check if the "topnav" class is present
  if (x.className === "topnav") {
    // If it is, add the "responsive" class
    x.className += " responsive";
  } else {
    // If the "responsive" class is already there, revert to the default "topnav" class
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeModalBtn = document.querySelectorAll(".close");
const form = document.querySelector("form");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const listBtnRadio = document.querySelectorAll("input[name='location']");
const labelCheckbox1 = document.getElementById("checkbox1");
const labelCheckbox2 = document.getElementById("checkbox2");
const message = document.getElementById("thanks-register");
message.style.display = "none";
// Functions
/**
 * Attaches an event listener to each button in `modalBtn` NodeList.
 * When a button is clicked, the `launchModal` function is called to display
 * the modal dialog.
 */
// Iterate through each button in the NodeList
modalBtn.forEach((btn) => {
  // Add a click event listener to the current button
  btn.addEventListener("click", launchModal);
});

/**
 * Displays the modal dialog by setting its display style to 'block'.
 */
function launchModal() {
  // Set the display property of the modal background to 'block' to show it
  modalbg.style.display = "block";
}

// Functionality to open the form in the current window for smaller screen sizes

/**
 * Adds an event listener to each button targeted by 'modalBtn' NodeList.
 * On click, checks if the window's inner width is less than 800px, and if so,
 * prevents the default button action, closes the modal, and opens the form
 * in the current window.
 */
modalBtn.forEach((btn) => {
  // Add a click event listener to the current button
  btn.addEventListener("click", (event) => {
    // Check if the window's inner width is less than 800px
    if (window.innerWidth < 800) {
      // Prevent the default click action
      event.preventDefault();
      // Close any currently open modal
      closeModal();
      // Open the form page in the current window
      window.open("form.html", "_self");
    }
  });
});

/**
 * Closes the modal when the button is clicked.
 * It attaches an event listener to each button in the 'closeModalBtn' collection.
 * When a button is clicked, the 'closeModal' function is invoked.
 */
closeModalBtn.forEach((btn) => {
  // Add click event listener that calls the closeModal function
  btn.addEventListener("click", closeModal);
});

/**
 * Closes the modal dialog by updating its display style to 'none'.
 * This effectively hides the modal from view.
 */
function closeModal() {
  // Update the display property of the modal background to 'none' to hide it
  modalbg.style.display = "none";
}

/**
 * Handles the submission of the form.
 * It prevents the default submission, validates input fields, displays error messages if needed,
 * and on successful validation, clears the form and redirects to the homepage.
 */
form.addEventListener("submit", (event) => {
  // Prevent the default form submit action
  event.preventDefault();

  // Validate individual form fields
  isCheckedCheckbox();
  isBirthdateValid(birthdate);

  // Log form values to the console (for debugging purposes)
  console.log(first.value);
  console.log(last.value);
  console.log(email.value);
  console.log(birthdate.value);
  console.log(quantity.value);
  console.log(labelCheckbox1.checked);

  // Add error messages next to form fields if they are invalid
  addFirstErrorMessage(first);
  addLastErrorMessage(last);
  addEmailErrorMessage(email);
  addQuantityErrorMessage(quantity);
  addBirthdateErrorMessage(birthdate);
  addRadioErrorMessage(listBtnRadio);
  addCheckboxErrorMessage(labelCheckbox1);

  // Validate the entire form
  if (validate()) {
    // If validation passes, clear the form fields and display a confirmation message
    clearForm();

    // After a delay, redirect the user to the homepage
    setTimeout(() => {
      window.open("index.html", "_self");
    }, 4000);

    // Log the form submission event to the console
    console.log("Form submitted");
  }
});

/**
 * Validates the entire form data.
 *
 * It checks if all form fields are filled and if the values meet certain validation criteria.
 * If a field is empty, it displays an alert and logs an error message to the console.
 * If the values of the fields do not meet the validation criteria set by various validation functions,
 * it logs that the form is not valid to the console.
 * If all validations pass, it logs that the form is valid and returns true.
 *
 * @returns {boolean} Returns true if the form is valid, otherwise false.
 */
function validate() {
  // Check if any of the required fields are empty
  if (
    first.value === "" ||
    last.value === "" ||
    email.value === "" ||
    birthdate.value === "" ||
    quantity.value === "" ||
    listBtnRadio.checked === false ||
    labelCheckbox1.checked === false
  ) {
    // Alert the user and log the error if any field is empty
    alert("Tous les champs doivent être remplis");
    console.log("Tous les champs doivent être remplis");
    return false;
  } else if (
    // Check if all fields pass their respective validations
    isValidInputFirst(first) &&
    isValidInputLast(last) &&
    isValidEmail(email) &&
    isBirthdateValid(birthdate) &&
    isNumber(quantity) &&
    isCheckedCheckbox() &&
    isCheckedRadios()
  ) {
    // If all validations pass
    console.log("Form valid");
    return true;
  } else {
    // If any validation fails
    console.log("Form not valid");
    return false;
  }
}

/**
 * Clears the form and displays a confirmation message.
 *
 * This function hides the form and displays a message to the user confirming that their reservation
 * has been received. After a set amount of time, the form is reset and displayed again, and the
 * message is hidden.
 */
function clearForm() {
  // Hide the form and show the confirmation message
  form.style.display = "none";
  message.style.display = "flex";
  message.textContent = "Merci ! Votre réservation a été reçue.";

  // After 5 seconds, reset the form and hide the confirmation message
  setTimeout(() => {
    form.style.display = "block";
    message.style.display = "none";
    form.reset(); // Reset the form fields to their default values
    closeModal(); // Close the modal dialog
  }, 5000);
}

// Validation functions
/**
 * Checks if the first name input is valid.
 *
 * This function uses a regular expression to validate if the input contains
 * at least two lowercase alphabetical characters. It updates the visibility
 * of the error message based on the validation result.
 *
 * @param {HTMLInputElement} input - The input element containing the first name.
 * @return {boolean} - True if the input is valid, false otherwise.
 */
function isValidInputFirst(input) {
  // Define a regex to match at least two lowercase alphabetical characters
  const regex = new RegExp("^[a-z]{2,}$");

  // Test if the input value matches the regex
  if (regex.test(input.value)) {
    console.log("Input valid");
    // Hide the error message
    first.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Input not valid");
    // Show the error message
    first.parentElement.dataset.errorVisible = "true";
  }

  // Return the result of the validation
  return regex.test(input.value);
}

/**
 * Checks if the last name input is valid.
 *
 * This function uses a regular expression to validate if the input contains
 * at least two lowercase alphabetical characters. It updates the visibility
 * of the error message based on the validation result.
 *
 * @param {HTMLInputElement} input - The input element containing the last name.
 * @return {boolean} - True if the input is valid, false otherwise.
 */
function isValidInputLast(input) {
  // Define a regex to match at least two lowercase alphabetical characters
  const regex = new RegExp("^[a-z]{2,}$");

  // Test if the input value matches the regex
  const isValid = regex.test(input.value);
  if (isValid) {
    console.log("Input valid");
    // Hide the error message
    last.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Input not valid");
    // Show the error message
    last.parentElement.dataset.errorVisible = "true";
  }

  // Return the result of the validation
  return isValid;
}

/**
 * Checks if the email input is valid.
 *
 * This function uses a regular expression to validate if the email provided
 * is in a valid format. It updates the visibility of the error message based
 * on the validation result.
 *
 * @param {HTMLInputElement} emailInput - The input element containing the email.
 * @return {boolean} - True if the email is in a valid format, false otherwise.
 */
function isValidEmail(emailInput) {
  // Define a regex pattern for valid email addresses
  const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]+$");
  // Check if the email input value matches the regex pattern
  if (emailRegex.test(emailInput.value)) {
    console.log("Email valid");
    // Hide the error message
    emailInput.parentElement.dataset.errorVisible = "false";
  } else {
    console.log("Email not valid");
    // Show the error message
    emailInput.parentElement.dataset.errorVisible = "true";
  }
  // Return the result of the validation
  return emailRegex.test(emailInput.value);
}

/**
 * Checks if the birthdate input is a valid date.
 *
 * This function attempts to create a Date object from the input value.
 * It then checks if the date is not a number (NaN), which indicates an invalid date.
 * Based on the validation, it updates the visibility of the error message and logs the result.
 *
 * @param {HTMLInputElement} input - The input element containing the birthdate.
 * @return {boolean} - True if the birthdate is a valid date, false otherwise.
 */
function isBirthdateValid(input) {
  // Try to create a Date object from the input value
  const date = new Date(input.value);

  // Check if the resulting date is invalid (NaN)
  if (isNaN(date.getTime())) {
    // Show the error message
    input.parentElement.dataset.errorVisible = "true";
    console.log("Date not valid");
    return false;
  }

  // If valid, hide the error message
  input.parentElement.dataset.errorVisible = "false";
  console.log("Date valid");
  return true;
}

/**
 * Checks if the input value is a valid number within the range 0 to 99.
 *
 * This function uses a regular expression to determine if the input value
 * is a number that falls within the expected range. It also handles the visibility
 * of an error message based on the validation outcome.
 *
 * @param {HTMLInputElement} numberInput - The input element containing the number.
 * @return {boolean} - True if the input value is a valid number, false otherwise.
 */
function isNumber(numberInput) {
  // Define a regular expression pattern for numbers between 0 and 99
  const numberRegex = new RegExp("^(?:[0-9]|[1-9][0-9])+$");

  // Test if the input value matches the number pattern
  if (numberRegex.test(numberInput.value)) {
    // Log the result and hide the error message if the number is valid
    console.log("Number valid");
    numberInput.parentElement.dataset.errorVisible = "false";
  } else {
    // Log the result and show the error message if the number is not valid
    console.log("Number not valid");
    numberInput.parentElement.dataset.errorVisible = "true";
  }

  // Return the result of the regex test
  return numberRegex.test(numberInput.value);
}

/**
 * Checks if any radio button in a given list is checked.
 *
 * This function iterates over an array of radio button elements and determines
 * if at least one of them is checked. It logs the value of the checked radio
 * and returns true if a checked button is found, otherwise false.
 *
 * @return {boolean} - True if any radio button is checked, false otherwise.
 */
function isCheckedRadios() {
  // Iterate over the list of radio button elements
  for (let i = 0; i < listBtnRadio.length; i++) {
    // Check if the current radio button is checked
    if (listBtnRadio[i].checked) {
      // Log the value of the checked radio button
      console.log(listBtnRadio[i].value);
      // Return true as a checked radio button has been found
      return true;
    }
  }
  // Return false as no checked radio buttons were found
  return false;
}
/**
 * Checks if a specific checkbox is checked.
 *
 * This function examines the checked state of the checkbox with the id
 * 'labelCheckbox1'. It logs a message to the console and returns a boolean
 * indicating whether the checkbox is checked.
 *
 * @return {boolean} - True if the checkbox is checked, false otherwise.
 */
function isCheckedCheckbox() {
  // Check if the checkbox is checked
  if (labelCheckbox1.checked) {
    // Log that the checkbox is checked
    console.log("Checkbox checked");
    // Return true indicating the checkbox is checked
    return true;
  } else {
    // Log that the checkbox is not checked
    console.log("Checkbox not checked");
    // Return false indicating the checkbox is not checked
    return false;
  }
}

/**
 * Adds an error message for the first name input if the value is not valid.
 *
 * This function checks if the first name input value meets a specific validity criterion.
 * If not, it creates and inserts an error message into the DOM just after the input element.
 * If a previous error message exists, it avoids creating a duplicate. If the input value is
 * valid and an error message exists, the function removes the error message.
 *
 * @param {HTMLElement} input - The input element that contains the first name value.
 */
function addFirstErrorMessage(input) {
  // Check if the first name input value is valid
  if (!isValidInputFirst(input)) {
    // Prevent adding duplicate error messages
    if (input.parentNode.querySelector(".data-error")) return;

    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    // Define the error message text
    errorMessage.innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.";

    // Insert the error message after the input element in the DOM
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    // Log the error message element for debugging
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    // If the input is valid, remove any existing error message

    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

/**
 * Adds an error message for the last name input if the value is not valid.
 *
 * This function checks if the last name input value meets a specific validity criterion.
 * If not, it creates and inserts an error message into the DOM just after the input element.
 * If a previous error message exists, it avoids creating a duplicate. If the input value is
 * valid and an error message exists, the function removes the error message.
 *
 * @param {HTMLElement} input - The input element that contains the last name value.
 */
function addLastErrorMessage(input) {
  // Check if the last name input value is valid
  if (!isValidInputLast(input)) {
    // Prevent adding duplicate error messages
    if (input.parentNode.querySelector(".data-error")) return;

    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error"); // Assign error message class for styling
    // Define the error message text
    errorMessage.innerText =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";

    // Insert the error message after the input element in the DOM
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    // Log the error message element for debugging purposes
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    // If the input is valid, remove any existing error message
    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

/**
 * Adds an error message for the email input if the value is not a valid email.
 *
 * This function validates the email input. If the value is not a valid email format,
 * it creates and inserts an error message into the DOM after the input element. If the
 * value is a valid email and an error message exists, it removes the error message.
 *
 * @param {HTMLElement} input - The input element that contains the email value.
 */
function addEmailErrorMessage(input) {
  // Check if the email is valid
  if (!isValidEmail(input)) {
    // Avoid adding duplicate error messages
    if (input.parentNode.querySelector(".data-error")) return;
    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    // Set the error message text
    errorMessage.innerText =
      "Veuillez entrer une adresse email valide. ex: JohnDoe6@example.com";
    // Insert the error message after the input element in the DOM
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    // Log the error message element for debugging purposes
    console.log(errorMessage);
  } else {
    // Remove the error message if the email is valid

    if (input.parentNode.querySelector(".data-error")) {
      input.parentNode.querySelector(".data-error").remove();
    }
  }
}

/**
 * Adds an error message if the birthdate is invalid.
 *
 * This function checks if the given input element contains a valid birthdate.
 * If the birthdate is invalid, it creates and inserts an error message into the DOM
 * after the input element. If the birthdate is valid and an error message exists, it removes the error message.
 *
 * @param {HTMLElement} input - The input element that contains the birthdate.
 */
function addBirthdateErrorMessage(input) {
  // Check if the birthdate is invalid
  if (!isBirthdateValid(input)) {
    // Prevent duplicate error messages
    if (input.parentNode.querySelector(".data-error")) return;
    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    // Set the error message text
    errorMessage.innerText = "Vous devez entrer votre date de naissance.";
    // Insert the error message in the DOM after the input element
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    // Log the error message element for debugging purposes
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    // If a birthdate is valid and an error message exists, remove the error message
    const errorElement = input.parentNode.querySelector(".data-error");
    if (errorElement) {
      errorElement.remove();
    }
  }
}

/**
 * Adds an error message for the quantity input if the value is not between 1 and 99.
 *
 * This function validates the quantity input. If the value is not a number, or is outside the
 * range of 1 to 99, it creates and inserts an error message into the DOM
 * after the input element. If the value is within the valid range and an error message exists,
 * it removes the error message.
 *
 * @param {HTMLElement} input - The input element that contains the quantity value.
 */
function addQuantityErrorMessage(input) {
  // Check if the value is a number and within the range of 1 to 99
  if (isNumber(input) < 1 || isNumber(input) > 99 || isNumber(input) == "") {
    // Avoid adding duplicate error messages
    if (input.parentNode.querySelector(".data-error")) return;
    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    // Set the error message text
    errorMessage.innerText =
      "Le nombre de tournois auquels vous avez participer doit être comprise entre 0 et 99";
    // Insert the error message after the input element in the DOM
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
    // Log the error message element for debugging purposes
    console.log(input.parentNode.querySelector(".data-error"));
  } else {
    // Remove the error message if the value is within the valid range
    const errorElement = input.parentNode.querySelector(".data-error");
    if (errorElement) {
      errorElement.remove();
    }
  }
}
/**
 * Adds an error message for radio button inputs if none are checked.
 *
 * Iterates over an array of radio button inputs and checks if any radio button is checked using
 * isCheckedRadios function. If no radio button is checked, it creates and inserts an error message
 * after the last child of the input's parent node. It also ensures that duplicate error messages
 * are not created. Additionally, it sets up an event listener on the form element containing the
 * inputs to remove error messages when a radio button is checked.
 *
 * @param {HTMLElement[]} inputs - An array of radio button input elements.
 */
function addRadioErrorMessage(inputs) {
  // Iterate over each input element
  inputs.forEach((input) => {
    // Check if any radio button is checked and if not add an error message
    if (!isCheckedRadios()) {
      // Avoid creating a duplicate error message
      if (input.parentNode.querySelector(".data-error")) return;

      // Create a new paragraph element for the error message
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("data-error"); // Use class for styling the error message
      errorMessage.innerText =
        "Veuillez sélectionner le tournoi que vous souhaitez participer";

      // Insert the error message as the last child in the input's parent node
      input.parentNode.appendChild(errorMessage); // Changed from insertBefore to appendChild
      console.log(input.parentNode.querySelector(".data-error")); // Log for debugging
    }
  });

  // Find the closest form element to set up a change event listener
  const form = inputs[0].closest("form");
  form.addEventListener("change", (event) => {
    // If a radio button is checked, remove any existing error messages
    if (isCheckedRadios()) {
      inputs.forEach((input) => {
        if (input.parentNode.querySelector(".data-error")) {
          input.parentNode.querySelector(".data-error").remove(); // Remove the error message
        }
      });
    }
  });
}

/**
 * Adds an error message if the terms & conditions checkbox is unchecked.
 *
 * This function checks the state of the checkbox with the id 'labelCheckbox1'.
 * If it is unchecked, an error message is created and inserted into the DOM
 * after the checkbox element. If the checkbox is checked, any existing
 * error message is removed.
 */
function addCheckboxErrorMessage() {
  // Check if the checkbox is unchecked
  if (!labelCheckbox1.checked) {
    // Prevent duplicate error messages
    if (labelCheckbox1.parentNode.querySelector(".data-error")) return;
    // Create a new paragraph element for the error message
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("data-error");
    // Set the error message text
    errorMessage.innerText =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    // Insert the error message in the DOM after the checkbox
    labelCheckbox1.parentNode.insertBefore(errorMessage, labelCheckbox2);
    // Log the error message element for debugging
    console.log(labelCheckbox1.parentNode.querySelector(".data-error"));
  } else {
    // If checkbox is checked and an error message exists, remove it
    const existingErrorMessage =
      labelCheckbox1.parentNode.querySelector(".data-error");
    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }
  }
}

// add error message
/**
 * Event listener for changes on the first input field.
 * This function will call addFirstErrorMessage when a change event occurs
 * on the 'first' input element to handle error message display.
 */
first.addEventListener("change", () => {
  // Call addFirstErrorMessage to check and handle the display of an error message
  addFirstErrorMessage(first);
});

/**
 * Event listener for changes on the last input field.
 * This function will call addLastErrorMessage when a change event occurs
 * on the 'last' input element to handle error message display.
 */
last.addEventListener("change", () => {
  // Call addLastErrorMessage to check and handle the display of an error message
  addLastErrorMessage(last);
});

/**
 * Event listener for changes on the quantity input field.
 * This function will call addQuantityErrorMessage when a change event occurs
 * on the 'quantity' input element to handle error message display.
 */
quantity.addEventListener("change", () => {
  // Call addQuantityErrorMessage to check and handle the display of an error message
  addQuantityErrorMessage(quantity);
});

/**
 * Event listener for changes on the email input field.
 * This function will call addEmailErrorMessage when a change event occurs
 * on the 'email' input element to handle error message display.
 *
 * The addEmailErrorMessage function is responsible for validating the email input
 * and displaying an error message if the entered email is not valid.
 */
email.addEventListener("change", () => {
  // Call addEmailErrorMessage to check and handle the display of an error message
  addEmailErrorMessage(email);
});

/**
 * Event listener for changes on the checkbox input field.
 * This function will call addCheckboxErrorMessage when a change event occurs
 * on the 'labelCheckbox1' checkbox element to handle error message display.
 *
 * The addCheckboxErrorMessage function is responsible for validating the checkbox input
 * and displaying an error message if the checkbox is not checked.
 */
labelCheckbox1.addEventListener("change", () => {
  // Call addCheckboxErrorMessage to check and handle the display of an error message
  addCheckboxErrorMessage(labelCheckbox1);
});

/**
 * Event listener for changes on the birthdate input field.
 * This function will call addBirthdateErrorMessage when a change event occurs
 * on the 'birthdate' input element to handle error message display.
 *
 * The addBirthdateErrorMessage function is responsible for validating the birthdate input
 * and displaying an error message if the entered birthdate is not valid.
 */
birthdate.addEventListener("change", () => {
  // Call addBirthdateErrorMessage to check and handle the display of an error message
  addBirthdateErrorMessage(birthdate);
});
