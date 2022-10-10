const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}

const showFieldError = (inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(errorClass);
}

const hideFieldError = (inputElement, inputErrorClass, errorClass) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = '';
}

const checkInputValidity = (inputEl, inputErrorClass, errorClass) => {
  if(inputEl.validity.patternMismatch){
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else{
    inputEl.setCustomValidity('');
  }
  if(!inputEl.validity.valid){
    showFieldError(inputEl, inputErrorClass, errorClass, inputEl.validationMessage);
  } else{
    hideFieldError(inputEl, inputErrorClass, errorClass);
  }
}

const toggleButtonState = (inputList, buttonEl, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)){
    buttonEl.disabled = true;
    buttonEl.classList.add(inactiveButtonClass);
  } else{
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

const disableButton = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__field'));
  const submitButton = popup.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton, 'popup__submit-button_disabled');
}

const setEventListeners = (inputList, buttonEl, inputErrorClass, errorClass, inactiveButtonClass) => {
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', function () {
      checkInputValidity(inputEl, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonEl, inactiveButtonClass);
    });
  })
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formList = document.querySelectorAll(`${formSelector}`);
  formList.forEach((formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(`${inputSelector}`));
    const submitButton = formEl.querySelector(`${submitButtonSelector}`);
    setEventListeners(inputList, submitButton, inputErrorClass, errorClass, inactiveButtonClass);
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
  })
}

export {enableValidation, disableButton, toggleButtonState};
