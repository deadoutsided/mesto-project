import './pages/index.css';

import { enableValidation } from './components/validate';
import { addCards, initialCards } from './components/card';
import { handleProfileFormSubmit, handleformSubmitCardAdd, openPopup, closePopup } from './components/util';
import { setExitPopupListeners } from './components/popup';

const placesContainer = document.querySelector('.places');
const buttonEdit = document.querySelector('.profile__edit-button');
const popEdit = document.querySelector('.popup_type_edit-profile');
const popAdd = document.querySelector('.popup_type_add-place');
const buttonAdd = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.popup__form_content_edit-profile');
const formName = editForm.querySelector('.popup__field_info_name');
const formDescription = editForm.querySelector('.popup__field_info_desc');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const addForm = popAdd.querySelector('.popup__form');
const cardName = addForm.querySelector('.popup__field_info_card-name');
const cardUrl = addForm.querySelector('.popup__field_info_card-img');
const cardPopup = document.querySelector('.popup_type_place');
const cardPopupName = cardPopup.querySelector('.popup__subtitle');
const cardPopupImg = cardPopup.querySelector('.popup__img');
const closeButtons = document.querySelectorAll('.popup__close-button');
const placeTemplate = document.querySelector('.place-template').content;
const popups = document.querySelectorAll('.popup__overlay');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
})

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

formDescription.value = profileDescription.textContent;
formName.value = profileName.textContent;

editForm.addEventListener('submit', (evt) => handleProfileFormSubmit(evt, profileName, formName, profileDescription, formDescription, popEdit));

buttonEdit.addEventListener('click', () => {
  openPopup(popEdit);
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;
});
buttonAdd.addEventListener('click', () => {openPopup(popAdd)});

addCards(initialCards, placeTemplate, cardPopupName, cardPopupImg, cardPopup);

addForm.addEventListener('submit', (evt) => handleformSubmitCardAdd(evt, placesContainer, cardName, cardUrl, placeTemplate, popAdd, cardPopupName, cardPopupImg, cardPopup));

popups.forEach((popup) => {
  setExitPopupListeners(popup);
})
