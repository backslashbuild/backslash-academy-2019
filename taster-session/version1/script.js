// Note - you would not typically comment anywhere near this amount, these comments are here to aid understanding for anyone new to javascript.

/**
 * Handler for the 'onsubmit' event for the guestbook form
 * @param {Event} e
 */
function submitForm(e) {
  // prevent the default behaviour of a form submission, you can try removing this line to see what it stops
  e.preventDefault();

  // call our create entry with the values from our form
  // notice that we can reference the form within document.forms based on the name attribute we put on the form. try changing it and updating it to match here
  createEntry(document.forms.form1.name.value, document.forms.form1.message.value);

  // reset the values of the form elements back to empty strings
  document.forms.form1.name.value = "";
  document.forms.form1.message.value = "";

  // focus the message element again so that a user doesn't have to click back there
  document.forms.form1.message.focus();
}

/**
 * This function adds a new entry to the guestbook message list <div>.
 * @param {string} name The name of the person making the guestbook entry.
 * @param {string} message The message the person has written.
 */
function createEntry(name, message) {
  // create a reference to the <template id="submission-template"> element
  const template = document.getElementById("submission-template");

  // clone the template element's content into a new node. the second parameter is set to true to tell it to copy the whole subtree of elements
  const clone = document.importNode(template.content, true);

  // finds the element in the new cloned template with a class of 'name' using the '.' prefix to select by class
  // fills that element with the value of the name pararmeter
  clone.querySelector(".name").textContent = name;

  // finds the element in the new cloned template with a class of 'message-text' using the '.' prefix to select by class
  // fills that element with the value of the message pararmeter
  clone.querySelector(".message-text").textContent = message;

  // find the submissions-content <div> element by id and call 'prepend' so that our new element is added at the top.
  document.getElementById("submissions-content").prepend(clone);
}

// set the handler of the 'onsubmit' event of form1 to be our submitForm function defined above
document.forms.form1.onsubmit = submitForm;

// call our createEntry function a few times with test data
createEntry("steven", "hello world");
createEntry("josh", "hi backslash academy!");
createEntry("george", "I am javascript");
createEntry("robert", "foo bar");

// focus the message input when this script runs - which will be as soon as the page has loaded.
document.forms.form1.message.focus();
