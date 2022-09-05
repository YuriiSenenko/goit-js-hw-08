import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[type=email]'),
  message: document.querySelector('textarea'),
};

populateTextarea();
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onSubmitButton);

function onTextareaInput(event) {
  formData[event.target.name] = event.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataJSON);
}

// функція відправки
// видаляється автооновлення сторінки
// очищається форма
// очищається сховище піся відправки
function onSubmitButton(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

//Отримую значення з сховища
//якщо там було значення, обновляю DOM
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseSavedMsg = JSON.parse(savedMessage);

  if (parseSavedMsg?.email) {
    refs.email.value = parseSavedMsg.email;
  }
  if (parseSavedMsg?.message) {
    refs.message.value = parseSavedMsg.message;
  }
  if (parseSavedMsg) {
    formData = parseSavedMsg;
  }
}
