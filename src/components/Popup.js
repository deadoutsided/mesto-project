export class Popup {
    
    static _closeButtonClass = 'popup__close-button';
    static _popupOpenClass = 'popup_opened';    

    constructor(selector) {
        this._modal = document.querySelector(selector);
    }

    open() {
        this._modal.classList.add(Popup._popupOpenClass);
        window.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._modal.classList.remove(Popup._popupOpenClass);
        window.removeEventListener('keydown', this._handleEscClose);        
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose = (event) => {       
        if (event.target.classList.contains("popup__overlay")) {
            this.close();
        }
    }

  
    setEventListeners() {        
        this._modal.addEventListener('mousedown', this._handleOverlayClose);        
        this._modal.querySelector(`.${Popup._closeButtonClass}`).addEventListener('click', () => {
                this.close();
        });
    }
}
