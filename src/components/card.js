import { openPopup } from "./util";

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

function createCard(title, img, template, subtitle, cardImg, cardPopup){  //template - placeTemplate
  const placeElement = template.querySelector('.place').cloneNode(true);
  const placeImg = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  placeImg.src = img;
  placeTitle.textContent = title;
  placeImg.setAttribute('alt', title);
  const deleteButton = placeElement.querySelector('.place__delete-button');

  placeImg.addEventListener('click', function(evt){
    const cardRef = evt.target.closest('.place');
    console.log(cardRef);
    console.log(subtitle);
    subtitle.textContent = cardRef.querySelector('.place__title').textContent;
    cardImg.src = cardRef.querySelector('.place__image').src;
    cardImg.alt = cardRef.querySelector('.place__image').alt;
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
};

function addCards(cardsInfo, template, subtitle, cardImg, cardPopup){
  const container = document.querySelector('.places');
  for(let i = 0; i < cardsInfo.length; i++){
  const placeElement = createCard(cardsInfo[i].name, cardsInfo[i].link, template, subtitle, cardImg, cardPopup);
  container.append(placeElement);
}
}

export { addCards, initialCards, createCard }
