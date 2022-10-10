import { closePopup, checkResp, renderLoading } from './util.js'
import { addCards } from './card'
import { setUserInfo, getUserInfo, postCard } from './api'

function setExitPopupListeners(popup){
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__overlay')){
      closePopup(evt.target.closest('.popup'))
    }
  });
};

function handleformSubmitCardAdd(evt, name, url, template, subtitle, cardImg, cardPopup, profileInfo, popup, container){
  evt.preventDefault();
  renderLoading(popup, 'Создать', true);
  postCard(name.value, url.value)
  .then((data) => {
    addCards(container, data, template, subtitle, cardImg, cardPopup, profileInfo);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    closePopup(popup);
    renderLoading(popup, 'Создать', false);
    evt.target.reset();
  });
}

function handleProfileFormSubmit(evt, profileName, formName, profileDescription, formDescription, popup){
  evt.preventDefault();
  renderLoading(popup, 'Сохранить', true);
  setUserInfo(formName.value, formDescription.value)
  .catch((err) => {
    console.log(err);
  });
  getUserInfo(profileName, profileDescription)
  .then(checkResp)
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch((err) => console.log(err))
  .finally(() => {
    closePopup(popup);
    renderLoading(popup, 'Сохранить', false);
  });
}

export { setExitPopupListeners, handleProfileFormSubmit, handleformSubmitCardAdd };
