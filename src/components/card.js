import { openPopup } from "./util";
import { deleteCard, deleteLikeCard, likeCard } from "./api";

function createCard(title, img, template, subtitle, cardImg, cardPopup, likesCount, cardId){
  const placeElement = template.querySelector('.place').cloneNode(true);
  const placeImg = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  const likeCounter = placeElement.querySelector('.place__like-count');
  placeImg.src = img;
  placeTitle.textContent = title;
  likeCounter.textContent = likesCount;
  placeImg.setAttribute('alt', title);
  const deleteButton = placeElement.querySelector('.place__delete-button');

  placeImg.addEventListener('click', function(evt){
    const cardRef = evt.target.closest('.place');
    subtitle.textContent = cardRef.querySelector('.place__title').textContent;
    cardImg.src = cardRef.querySelector('.place__image').src;
    cardImg.alt = cardRef.querySelector('.place__image').alt;
    openPopup(cardPopup);
  })
  placeElement.querySelector('.place__like-button').addEventListener('click', function(evt){
    const likeButton = evt.target;
    const likeCounter = likeButton.closest('.place__likes-cont').querySelector('.place__like-count');
    if(likeButton.classList.contains('place__like-button_active')){
      deleteLikeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.toggle('place__like-button_active');
      })
      .catch((err) => console.log(err));
    } else {
      likeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.toggle('place__like-button_active');
      })
      .catch((err) => {
        console.log(err);
      });
    }
  })
  deleteButton.addEventListener('click', function(){
    const placeItem = deleteButton.closest('.place');
    deleteCard(cardId)
    .then(() => {
      placeItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
  })

  return placeElement;
};

function addCards(container, cardsInfo, template, subtitle, cardImg, cardPopup, profileInfo){
  if(Array.isArray(cardsInfo)){
    for(let i = 0; i < cardsInfo.length; i++){
      const placeElement = createCard(cardsInfo[i].name, cardsInfo[i].link, template, subtitle, cardImg, cardPopup, cardsInfo[i].likes.length, cardsInfo[i]._id);
      const likesCheck = cardsInfo[i].likes.some((liker) => {
        return liker._id === profileInfo._id;
      });
      console.log(likesCheck)
      if(profileInfo._id !== cardsInfo[i].owner._id){
        placeElement.querySelector('.place__delete-button').remove();
      };
      if(likesCheck){
        placeElement.querySelector('.place__like-button').classList.add('place__like-button_active');
      }
      container.append(placeElement);
    }
    } else {
      const placeElement = createCard(cardsInfo.name, cardsInfo.link, template, subtitle, cardImg, cardPopup, cardsInfo.likes.length, cardsInfo._id);
      if(profileInfo._id !== cardsInfo.owner._id){
        placeElement.querySelector('.place__delete-button').remove();
      }
      container.prepend(placeElement);
    }
}

export { addCards, createCard }
