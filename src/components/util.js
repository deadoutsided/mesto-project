import { addCards, createCard } from './card'
import { setUserInfo, getUserInfo, postCard } from './api'

function checkResp(res) {
  if(res.ok){
    return res.json();
  } else return Promise.reject(`Произошла ошибка ${res.status}`);
}

function handleEscClose(evt){
  if(evt.key === 'Escape'){
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose)
}

function renderLoading(form, baseText, status){
  const button = form.querySelector('.popup__submit-button');
  if (status === true){
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = baseText;
  }
}

/*function handleformSubmitCardAdd(evt, name, url, template, subtitle, cardImg, cardPopup, profileInfo, popup, container){
  evt.preventDefault();
  renderLoading(popup, 'Создать', true);
  postCard(name.value, url.value)
  .then((data) => {
    addCards(container, data, template, subtitle, cardImg, cardPopup, profileInfo);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    closePopup(popup);
    renderLoading(popup, 'Создать', false)});
  evt.target.reset();
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
  .finally(() => renderLoading(popup, 'Сохранить', false));

  closePopup(popup);
}*/

export { renderLoading, openPopup, closePopup, checkResp}
