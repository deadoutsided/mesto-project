let buttonEdit = document.querySelector('.profile__edit-button');
let popEdit = document.querySelector('.popup_type_edit-profile');
let popAdd = document.querySelector('.popup_type_add-place');
let buttonAdd = document.querySelector('.profile__add-button');
let editForm = document.querySelector('.popup__form');
let formName = editForm.querySelector('.popup__field');
let formDescription = editForm.querySelectorAll('.popup__field')[1];
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__paragraph');

function formSubmitHandler(evt){
  evt.preventDefault();
  editedName = formName.value;
  editedDescription = formDescription.value;
  profileName.textContent = editedName;
  profileDescription.textContent = editedDescription;
  popupClose(popEdit);
}

editForm.addEventListener('submit', formSubmitHandler);

function popupAppearance(popup){
  popup.classList.add('popup_opened');
  let btnClose = popup.querySelector('.popup__close-button');
  btnClose.addEventListener('click', () => {popupClose(popup)});

  if(popup.classList.contains('popup_type_edit-profile')){
    formDescription.value = profileDescription.textContent;
    formName.value = profileName.textContent;
  }
}

function popupClose(popup){
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', () => {popupAppearance(popEdit)});
buttonAdd.addEventListener('click', () => {popupAppearance(popAdd)});
