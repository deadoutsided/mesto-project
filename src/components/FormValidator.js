class FormValidator{
  constructor({inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement){
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    this._submitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
  }

  _hasInvalidInput(){
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }

  _toggleButtonState(){
    if(this._hasInvalidInput(this._inputList)){
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else{
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showFieldError(inputElement, errorMessage){
    this._errorEl = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorEl.textContent = errorMessage;
    this._errorEl.classList.add(this._errorClass);
  }

  _hideFieldError(inputElement){
    this._errorEl = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorEl.classList.remove(this._errorClass);
    this._errorEl.textContent = '';
  }

  _checkInputValidity(inputEl){
    if(inputEl.validity.patternMismatch){
      inputEl.setCustomValidity(inputEl.dataset.errorMessage);
    } else{
      inputEl.setCustomValidity('');
    }
    if(!inputEl.validity.valid){
      this._showFieldError(inputEl, inputEl.validationMessage);
    } else{
      this._hideFieldError(inputEl);
    }
  }

  _setEventListeners(){
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    })
  }

  enableValidation(){
    console.log(this._submitButton);
    console.log(this._inputList);
    this._setEventListeners();
    this._toggleButtonState();
  }
}

export { FormValidator };
