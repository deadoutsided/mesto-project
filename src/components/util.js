import { createCard } from './card'
import { setUserInfo, getUserInfo, postCard, renderLoading } from './api'

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

function handleformSubmitCardAdd(evt, name, url, popup){
  evt.preventDefault();
  renderLoading(popup, 'Создать', true);
  postCard(name.value, url.value)
  .then((res) => {
    if(res.ok) {
      return res.json();
    } else return res.statusText;
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popup, 'Создать', false));

  closePopup(popup);
  evt.target.reset();
}

function handleProfileFormSubmit(evt, profileName, formName, profileDescription, formDescription, popup){
  evt.preventDefault();
  renderLoading(popup, 'Сохранить', true);
  setUserInfo(formName.value, formDescription.value)
  .then((res) => {
    if(res.ok){
      return res.json();
    } else return res.statusText;
  })
  .catch((err) => {
    console.log(err);
  });
  getUserInfo(profileName, profileDescription)
  .then((res) => {
    if(res.ok){
      return res.json();
    } else return res.statusText;
  })
  .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    if(profileImg === undefined){
      return data
    }else{
      profileImg.src = data.avatar;
    }
  })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popup, 'Сохранить', false));

  closePopup(popup);
}

export {handleProfileFormSubmit, handleformSubmitCardAdd, openPopup, closePopup}
