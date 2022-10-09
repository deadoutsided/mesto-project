import './pages/index.css';

import { enableValidation, toggleButtonState } from './components/validate';
import { addCards} from './components/card';
import { handleProfileFormSubmit, handleformSubmitCardAdd, openPopup, closePopup } from './components/util';
import { setExitPopupListeners } from './components/modal';
import { getCards, getUserInfo, setUserInfo, postCard, updateAvatar, renderLoading } from './components/api';

const placesContainer = document.querySelector('.places');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAvatar = document.querySelector('.profile__avatar-button');
const popEdit = document.querySelector('.popup_type_edit-profile');
const popAdd = document.querySelector('.popup_type_add-place');
const popAvatar = document.querySelector('.popup_type_avatar');
const buttonAdd = document.querySelector('.profile__add-button');
const editForm = document.querySelector('.popup__form_content_edit-profile');
const formName = editForm.querySelector('.popup__field_info_name');
const formDescription = editForm.querySelector('.popup__field_info_desc');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__paragraph');
const profileImg = document.querySelector('.profile__img');
const addForm = popAdd.querySelector('.popup__form');
const cardName = addForm.querySelector('.popup__field_info_card-name');
const cardUrl = addForm.querySelector('.popup__field_info_card-img');
const cardPopup = document.querySelector('.popup_type_place');
const cardPopupName = cardPopup.querySelector('.popup__subtitle');
const cardPopupImg = cardPopup.querySelector('.popup__img');
const closeButtons = document.querySelectorAll('.popup__close-button');
const placeTemplate = document.querySelector('.place-template').content;
const popups = document.querySelectorAll('.popup__overlay');
const avatarFormImg = popAvatar.querySelector('.popup__field_info_avatar');

getUserInfo()
.then((res) => {
  if(res.ok){
    return res.json();
  } else return res.statusText;
})
.then((data) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.src = data.avatar;
})
.catch((err) => console.log(err));

getCards()
.then((res) => {
  if(res.ok){
    return res.json();
  } else return res.statusText;
})
.then((data) => {
  addCards(data, placeTemplate, cardPopupName, cardPopupImg, cardPopup, '85c1c9fc702d2028167579d4');
})
.catch((err) => console.log(err));
popAvatar.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  renderLoading(popAvatar, 'Сохранить', true);
  updateAvatar(avatarFormImg.value)
  .then((res) => {
    if(res.ok){
      return res.json();
    } else return res.statusText;
    })
  .then((data) => { profileImg.src = data.avatar })
  .catch((err) => console.log(err))
  .finally(() => renderLoading(popAvatar, 'Сохранить', false));
  closePopup(popAvatar);
});

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
buttonAdd.addEventListener('click', () => {
  openPopup(popAdd);
  const inputList = Array.from(popAdd.querySelectorAll('.popup__field'));
  const submitButton = popAdd.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton, 'popup__submit-button_disabled');
});
buttonAvatar.addEventListener('click', () => {
  openPopup(popAvatar);
  const inputList = Array.from(popAvatar.querySelectorAll('.popup__field'));
  const submitButton = popAvatar.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton, 'popup__submit-button_disabled');
})

addForm.addEventListener('submit', (evt) => handleformSubmitCardAdd(evt, cardName, cardUrl, popAdd));

popups.forEach((popup) => {
  setExitPopupListeners(popup);
})

