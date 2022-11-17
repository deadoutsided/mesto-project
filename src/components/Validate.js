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

export { FormValidator };
