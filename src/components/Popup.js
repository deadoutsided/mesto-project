class Popup {
    constructor(selector) {
        this._selector = selector
    }

    open() {
        document.querySelector(`.${this._selector}`).classList.add('popup_opened');
    }

    close() {
        document.querySelector(`.${this._selector}`).classList.remove('popup_opened');
    }

    _handleEscClose() {
        if (evt.key === "Escape") {
            this.close();
        }
    }

   
}