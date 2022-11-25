import { Popup } from "./Popup";

export class PopupWithImage extends Popup{

    static _imageClass =  'popup__img';
    static _imageCaptionClass = 'popup__subtitle';

    constructor (selector) {
        super(selector);
        this._modal = document.querySelector(selector);
    }

    open(cardLink, cardName) {
        document.querySelector(`.${PopupWithImage._imageClass}`).src = cardLink;
        document.querySelector(`.${PopupWithImage._imageClass}`).alt = cardName;
        document.querySelector(`.${PopupWithImage._imageCaptionClass}`).textContent = cardName;
        window.addEventListener('keydown', () => {
            super._handleEscClose();
        });
        this._modal.classList.add(Popup._popupOpenClass);
    }
}
