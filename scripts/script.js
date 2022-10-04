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
const placesContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('.place-template').content;

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}

const showFieldError = (inputElement, errorMessage) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__field_type_error');
  console.log(inputElement.getAttribute('id'));
  errorEl.textContent = errorMessage;
  errorEl.classList.add('popup__field-error_active');
}

const hideFieldError = (inputElement) => {
  const errorEl = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_type_error');
  errorEl.classList.remove('popup__field-error_active');
  errorEl.textContent = '';
}

const checkInputValidity = (inputEl) => {
  if(inputEl.validity.patternMismatch){
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else{
    console.log('SOOOSIIII');
    inputEl.setCustomValidity('');
  }
  if(!inputEl.validity.valid){
    console.log(inputEl.validationMessage);
    showFieldError(inputEl, inputEl.validationMessage);
  } else{
    hideFieldError(inputEl);
  }
}

const toggleButtonState = (inputList, buttonEl) => {
  if(hasInvalidInput(inputList)){
    buttonEl.disabled = true;
    buttonEl.classList.add('popup__submit-button_disabled');
  } else{
    buttonEl.classList.remove('popup__submit-button_disabled');
    buttonEl.disabled = false;
  }
}

const setEventListeners = (inputList, buttonEl) => {
  inputList.forEach((inputEl) => {
    console.log(inputEl);
    inputEl.addEventListener('input', function () {
      checkInputValidity(inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  })
}

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}){
  const formList = document.querySelectorAll(`${formSelector}`);
  formList.forEach((formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(`${inputSelector}`));
    console.log(inputList);
    const submitButton = formEl.querySelector(`${submitButtonSelector}`);
    setEventListeners(inputList, submitButton);
    toggleButtonState(inputList, submitButton);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button'
})

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

formDescription.value = profileDescription.textContent;
formName.value = profileName.textContent;

function handleProfileFormSubmit(evt){
  evt.preventDefault();
  profileName.textContent = formName.value;;
  profileDescription.textContent = formDescription.value;

  closePopup(popEdit);
}

editForm.addEventListener('submit', handleProfileFormSubmit);

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', () => {openPopup(popEdit);
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;});
buttonAdd.addEventListener('click', () => {openPopup(popAdd)});


function createCard(title, img){
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImg = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  placeImg.src = img;
  placeTitle.textContent = title;
  placeImg.setAttribute('alt', title);
  const deleteButton = placeElement.querySelector('.place__delete-button');

  placeImg.addEventListener('click', function(evt){
    const cardRef = evt.target.closest('.place');
    cardPopupName.textContent = cardRef.querySelector('.place__title').textContent;
    cardPopupImg.src = cardRef.querySelector('.place__image').src;
    cardPopupImg.alt = cardRef.querySelector('.place__image').alt;
    openPopup(cardPopup);
  })
  placeElement.querySelector('.place__like-button').addEventListener('click', function(evt){
    const likeButton = evt.target;
    likeButton.classList.toggle('place__like-button_active');
  })
  deleteButton.addEventListener('click', function(){
    const placeItem = deleteButton.closest('.place');
    placeItem.remove();
  })

  return placeElement;
}

for(let i = 0; i < initialCards.length; i++){
  const placeElement = createCard(initialCards[i].name,initialCards[i].link);
  placesContainer.append(placeElement);
}


function handleformSubmitCardAdd(evt){
  evt.preventDefault();
  const placeElement = createCard(cardName.value,cardUrl.value);
  placesContainer.prepend(placeElement);
  closePopup(popAdd);
  evt.target.reset();
}
addForm.addEventListener('submit', handleformSubmitCardAdd);

