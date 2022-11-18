import Popup from "./Popup";


export default class PopupWithForm extends Popup {

    static _formClass = 'popup__form';
    static _inputsClass = 'popup__field';
    
    constructor(selector, {handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit
    }

    close() {                
        this._modal.classList.remove(Popup._popupOpenClass);
        this._form = this._modal.querySelector(`.${PopupWithForm._formClass}`);
        this._form.reset();        
    }

    _getInputValues () { 
        this._inputList = this._modal.querySelectorAll(`.${PopupWithForm._inputsClass}`);
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        return this._formValues;        
    }

    setEventListeners() {
        window.addEventListener('keydown', () => {
            super._handleEscClose();
        });
        this._modal.addEventListener('mousedown', () => {
            super._handleOverlayClose();
        });        
        this._modal.querySelector(`.${Popup._closeButtonClass}`).addEventListener('click', () => {
            this.close();
        });
        this._modal.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}


/*  Создание экземпляра класса (пример для формы Профиля):

const profilePopup = new PopupWithForm('селектор модалки',
  {handleFormSubmit: (formData) => {
    reqvest.setUserInfo(formData.name, formData.job)    
    .then(user => {
        profileName.textContent = user.name;
        profileDescription.textContent = user.nickname;
        profilePopup.close();
    })
    .catch((err) => {
        alert(err);
    })
  }
});*/