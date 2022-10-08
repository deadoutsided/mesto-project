import { closePopup } from './util'

function setExitPopupListeners(popup){
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__overlay')){
      closePopup(evt.target.closest('.popup'))
    }
  });
}

export { setExitPopupListeners };
