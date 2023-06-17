import { Popup } from "./Popup";

export class PopupWithImage extends Popup{

    static _imageClass =  'popup__img';
    static _imageCaptionClass = 'popup__subtitle';

    constructor (selector) {
        super(selector);
        this._modal = document.querySelector(selector);
        this._image = document.querySelector(`.${PopupWithImage._imageClass}`);
        this._imageCaption = document.querySelector(`.${PopupWithImage._imageCaptionClass}`);
    }

    open(cardLink, cardName) {
        this._image.src = cardLink;
        this._image.alt = cardName;
        this._imageCaption.textContent = cardName;
        super.open();
    }
}
