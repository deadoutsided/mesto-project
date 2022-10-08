import { closePopup } from './util'

function keyHandler(evt){
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

function setExitPopupListeners(popup){
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__overlay')){
      closePopup(evt.target.closest('.popup'))
    }
  });
  document.addEventListener('keydown', keyHandler);
}

export { setExitPopupListeners };
