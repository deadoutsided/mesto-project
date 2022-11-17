import { closeButtons } from "../pages/index.js"

export default class Popup {
    constructor(selector) {
        this._modal = document.querySelector(selector);
    }

    open() {
        this._modal.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._modal.classList.remove('popup_opened');
    }

    _handleEscClose() {
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
        closeButtons.forEach(el => {
            el.addEventListener('click', () => {
                this.close();
            })
        });
    }
   
}