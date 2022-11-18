export default class Popup {
    
    static _closeButtonClass = 'popup__close-button';
    static _popupOpenClass = 'popup_opened';    

    constructor(selector) {
        this._modal = document.querySelector(selector);
    }

    open() {
        this._modal.classList.add(Popup._popupOpenClass);
        this.setEventListeners();
    }

    close() {
        this._modal.classList.remove(Popup._popupOpenClass);
    }

    _handleEscClose () {
        if (event.key === "Escape") {
            this.close();
        }
    }

    _handleOverlayClose() {
        if(event.target === event.currentTarget) {
            this.close();
          } 
    }

  
    setEventListeners() {
        window.addEventListener('keydown', () => {
            this._handleEscClose();
        });
        this._modal.addEventListener('mousedown', () => {
            this._handleOverlayClose();
        });        
        this._modal.querySelector(`.${Popup._closeButtonClass}`).addEventListener('click', () => {
                this.close();
        });
    }
}