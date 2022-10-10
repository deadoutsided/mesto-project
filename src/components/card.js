import { openPopup } from "./util";
import { deleteCard, deleteLikeCard, likeCard } from "./api";

function createCard(cardInfo, template, subtitle, cardImg, cardPopup, likesCount, cardId, profileInfo){
  const placeElement = template.querySelector('.place').cloneNode(true);
  const placeImg = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  const likeCounter = placeElement.querySelector('.place__like-count');
  const likeButtonNode = placeElement.querySelector('.place__like-button');
  placeImg.src = cardInfo.link;
  placeTitle.textContent = cardInfo.name;
  likeCounter.textContent = likesCount;
  placeImg.setAttribute('alt', cardInfo.name);
  const deleteButton = placeElement.querySelector('.place__delete-button');

  const likesCheck = cardInfo.likes.some((liker) => {
    return liker._id === profileInfo._id;
  });
  if(profileInfo._id !== cardInfo.owner._id){
    placeElement.querySelector('.place__delete-button').remove();
  };
  if(likesCheck){
    likeButtonNode.classList.add('place__like-button_active');
  }

  placeImg.addEventListener('click', function(evt){
    subtitle.textContent = cardInfo.name;
    cardImg.src = cardInfo.link;
    cardImg.alt = cardInfo.name;
    openPopup(cardPopup);
  })
  likeButtonNode.addEventListener('click', function(evt){
    const likeButton = evt.target;
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
      const placeElement = createCard(cardsInfo[i], template, subtitle, cardImg, cardPopup, cardsInfo[i].likes.length, cardsInfo[i]._id, profileInfo);
      container.append(placeElement);
    }
    } else {
      const placeElement = createCard(cardsInfo, template, subtitle, cardImg, cardPopup, cardsInfo.likes.length, cardsInfo._id, profileInfo);
      container.prepend(placeElement);
    }
}

export { addCards, createCard }
