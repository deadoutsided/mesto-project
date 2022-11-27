import { Popup } from "./Popup";

export class PopupWithForm extends Popup {

    static _formClass = 'popup__form';
    static _inputsClass = 'popup__field';

    constructor(selector, {handleFormSubmit}) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit
        this._modal = document.querySelector(selector);
        this._form = this._modal.querySelector(`.${PopupWithForm._formClass}`);
    }

    close() {
        super.close();        
        this._form.reset();
    }

    _getInputValues () {
        this._inputList = this._modal.querySelectorAll(`.${PopupWithForm._inputsClass}`);
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
};
