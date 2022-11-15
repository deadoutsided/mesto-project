class Popup {
    constructor(selector) {
        this._modal = document.querySelector(selector);
    }

    open() {
        this._modal.classList.add('popup_opened');
    }

    close() {
        this._modal.classList.remove('popup_opened');
    }

    _handleEscClose() {
        if (evt.key === "Escape") {
            this.close();
        }
    }

   
}