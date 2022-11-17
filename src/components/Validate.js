class FormValidator{
  constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement){
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputList){
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonEl, inactiveButtonClass){
    if(this._hasInvalidInput(inputList)){
      buttonEl.disabled = true;
      buttonEl.classList.add(inactiveButtonClass);
    } else{
      buttonEl.classList.remove(inactiveButtonClass);
      buttonEl.disabled = false;
    }
  }

  _showFieldError(inputElement, inputErrorClass, errorClass, errorMessage){
    const errorEl = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(errorClass);
  }

  _hideFieldError(inputElement, inputErrorClass, errorClass){
    const errorEl = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorEl.classList.remove(errorClass);
    errorEl.textContent = '';
  }

  _checkInputValidity(inputEl, inputErrorClass, errorClass){
    if(inputEl.validity.patternMismatch){
      inputEl.setCustomValidity(inputEl.dataset.errorMessage);
    } else{
      inputEl.setCustomValidity('');
    }
    if(!inputEl.validity.valid){
      this._showFieldError(inputEl, inputErrorClass, errorClass, inputEl.validationMessage);
    } else{
      this._hideFieldError(inputEl, inputErrorClass, errorClass);
    }
  }

  _setEventListeners(inputList, buttonEl, inputErrorClass, errorClass, inactiveButtonClass){
    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl, inputErrorClass, errorClass);
        this._toggleButtonState(inputList, buttonEl, inactiveButtonClass);
      });
    })
  }

  enableValidation(){
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    this._submitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
    this._setEventListeners(this._inputList, this._submitButton, this._inputErrorClass, this._errorClass, this._inactiveButtonClass);
    this._toggleButtonState(this._inputList, this._submitButton, this._inactiveButtonClass);
  }
}

/*const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}*/

/*const showFieldError = (inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(errorClass);
}*/

/*const hideFieldError = (inputElement, inputErrorClass, errorClass) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorEl.classList.remove(errorClass);
  errorEl.textContent = '';
}*/

/*const checkInputValidity = (inputEl, inputErrorClass, errorClass) => {
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
}*/

/*const toggleButtonState = (inputList, buttonEl, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)){
    buttonEl.disabled = true;
    buttonEl.classList.add(inactiveButtonClass);
  } else{
    buttonEl.classList.remove(inactiveButtonClass);
    buttonEl.disabled = false;
  }
}*/

/*const setEventListeners = (inputList, buttonEl, inputErrorClass, errorClass, inactiveButtonClass) => {
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', function () {
      checkInputValidity(inputEl, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonEl, inactiveButtonClass);
    });
  })
}*/
//formSelector - базовый селектор формы(в функции перебираются все формы). А для каждой формы должен создаваться отдельный класс
// следовательно, нужно убрать первые две строки из функции перед её переносом в класс
/*function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formList = document.querySelectorAll(`${formSelector}`);
  formList.forEach((formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(`${inputSelector}`));
    const submitButton = formEl.querySelector(`${submitButtonSelector}`);
    setEventListeners(inputList, submitButton, inputErrorClass, errorClass, inactiveButtonClass);
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
  })
}*/

export {/*enableValidation, toggleButtonState*/ FormValidator };
