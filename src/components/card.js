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
      .then((res) => {
        if(res.ok){
          return res.json();
        } else return res.statusText;
      })
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => console.log(err));
    } else {
      likeCard(cardId)
      .then((res) => {
        if(res.ok){
          return res.json();
        } else return res.statusText;
        })
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
    likeButton.classList.toggle('place__like-button_active');
  })
  deleteButton.addEventListener('click', function(){
    const placeItem = deleteButton.closest('.place');
    deleteCard(cardId)
    .then((res) =>{
      if(res.ok){
        return res.json();
      } else return res.statusText;
    })
    .catch((err) => {
      console.log(err);
    });
    placeItem.remove();
  })

  return placeElement;
};

function addCards(cardsInfo, template, subtitle, cardImg, cardPopup, id){
  const container = document.querySelector('.places');
  for(let i = 0; i < cardsInfo.length; i++){
    const placeElement = createCard(cardsInfo[i].name, cardsInfo[i].link, template, subtitle, cardImg, cardPopup, cardsInfo[i].likes.length, cardsInfo[i]._id);
    if(id !== cardsInfo[i].owner._id){
      placeElement.querySelector('.place__delete-button').remove();
    }
    container.append(placeElement);
}
}

export { addCards, createCard }
