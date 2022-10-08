import { createCard } from './card'

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function handleformSubmitCardAdd(evt, container, name, url, template, popup, subtitle, cardImg, cardPopup){
  evt.preventDefault();
  const placeElement = createCard(name.value, url.value, template, subtitle, cardImg, cardPopup);
  container.prepend(placeElement);
  closePopup(popup);
  evt.target.reset();
}

function handleProfileFormSubmit(evt, profileName, formName, profileDescription, formDescription, popup){
  evt.preventDefault();
  profileName.textContent = formName.value;;
  profileDescription.textContent = formDescription.value;

  closePopup(popup);
}

export {handleProfileFormSubmit, handleformSubmitCardAdd, openPopup, closePopup}
