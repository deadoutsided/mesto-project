import { Popup } from "./Popup";

export class PopupWithImage extends Popup{

    static _imageClass =  'popup__img';
    static _imageCaptionClass = 'popup__subtitle';

    constructor (selector) {
        super(selector);
    }

    open(cardLink, cardName) {
        document.querySelector(`.${PopupWithImage._imageClass}`).src = cardLink;
        document.querySelector(`.${PopupWithImage._imageClass}`).alt = cardName;
        document.querySelector(`.${PopupWithImage._imageCaptionClass}`).textContent = cardName;
        this._modal.classList.add(Popup._popupOpenClass);
        super.setEventListeners();
    }
}
