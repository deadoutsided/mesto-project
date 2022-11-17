
import Popup from "./Popup";


export default class PopupWithImage extends Popup{
    constructor (selector) {
        super(selector);
    }

    open(cardLink, cardName) {        
        document.querySelector(".popup__subtitle").textContent = cardName;
        document.querySelector(".popup__img").src = cardLink;
        document.querySelector(".popup__img").alt = cardName;
        this._modal.classList.add('popup_opened');
        super.setEventListeners();
    }
}