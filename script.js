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


let placesContainer = document.querySelector('.places');
let placeTemplate = document.querySelector('.place-template').content;

let popupPlaceTemp = document.querySelector('.popup__place-template').content;
function createPopPlace(card){
  let popPlaceElement = popupPlaceTemp.querySelector('.popup').cloneNode(true);
  popPlaceElement.querySelector('.popup__img').src = card.querySelector('.place__image').src;
  popPlaceElement.querySelector('.popup__subtitle').textContent = card.querySelector('.place__title').textContent;
  document.querySelector('.page').append(popPlaceElement);
  popPlaceElement.classList.add('popup_opened');
  popPlaceCloseBtn = popPlaceElement.querySelector('.popup__close-button_card');
  popPlaceCloseBtn.addEventListener('click', function(evt){
    const delPopCard = popPlaceCloseBtn.closest('.popup_type_place');
    delPopCard.remove();
  })
  console.log(popPlaceElement);
}

for(let i = 0; i < initialCards.length; i++){
  let placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  let placeImg = placeElement.querySelector('.place__image');
  placeImg.src = initialCards[i].link;
  placeElement.querySelector('.place__title').textContent = initialCards[i].name;
  placeImg.setAttribute('alt', initialCards[i].name);


  placeImg.addEventListener('click', function(evt){
    const cardRef = evt.target.closest('.place');
    console.log(cardRef);
    createPopPlace(cardRef);
  })
  placeElement.querySelector('.place__like-button').addEventListener('click', function(evt){
    const likeButton = evt.target;
    likeButton.classList.toggle('place__like-button_active');
  })
  let deleteButton = placeElement.querySelector('.place__delete-button');
  deleteButton.addEventListener('click', function(){
    const placeItem = deleteButton.closest('.place');
    placeItem.remove();
  })
  placesContainer.append(placeElement);
}


let addForm = popAdd.querySelector('.popup__form');

function formSubmitCardAdd(evt){
  evt.preventDefault();
  let cardName = addForm.querySelector('.popup__field').value;
  let cardUrl = addForm.querySelectorAll('.popup__field')[1].value;
  let placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  let placeImg = placeElement.querySelector('.place__image');
  placeImg.src = cardUrl;
  placeElement.querySelector('.place__title').textContent = cardName;
  placeImg.setAttribute('alt', cardName);
  placeImg.addEventListener('click', function(evt){
    const cardRef = evt.target.closest('.place');
    console.log(cardRef);
    createPopPlace(cardRef);
  })
  placeElement.querySelector('.place__like-button').addEventListener('click', function(evt){
    const likeButton = evt.target;
    likeButton.classList.toggle('place__like-button_active');
  })
  let deleteButton = placeElement.querySelector('.place__delete-button');
  deleteButton.addEventListener('click', function(){
    const placeItem = deleteButton.closest('.place');
    placeItem.remove();
  })
  placesContainer.prepend(placeElement);
  popupClose(popAdd);
  addForm.querySelector('.popup__field').value = '';
  addForm.querySelectorAll('.popup__field')[1].value = '';
}
addForm.addEventListener('submit', formSubmitCardAdd);

