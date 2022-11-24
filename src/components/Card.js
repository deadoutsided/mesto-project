import { cardsInfo } from "./CardsInfo";

import { Popup } from "./Popup";

export class Card {
  static places = {
    place: ".place",
    title: ".place__title",
    likeCounte: ".place__like-count",
    likeButton: ".place__like-button",
    likeButtonActive: "place__like-button_active",
    image: ".place__image",
    deleteButton: ".place__delete-button",
    popupConfirmDelete: ".popup_type_confirm-delete",
    formConfirmDelete: ".popup__form_content_confirm-delete",
  };

  _selectorTemplate;
  _container;
  _cardsInfo;
  _profileInfo;

  constructor(
    selectorTemplate,
    container,
    cardsInfo,
    profileInfo,
    handleCardClick
  ) {
    this._selectorTemplate = selectorTemplate;
    this._container = container;
    this._cardsInfo = cardsInfo;
    this._profileInfo = profileInfo;
    this.handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(Card.places.place)
      .cloneNode(true);
    return cardElement;
  }

  generate(cardInfo) {
    this._element = this._getElement();
    this._placeImg = this._element.querySelector(Card.places.image);
    this._placeTitle = this._element.querySelector(Card.places.title);
    this._likeCounter = this._element.querySelector(Card.places.likeCounte);
    this._likeButton = this._element.querySelector(Card.places.likeButton);
    this._deleteButton = this._element.querySelector(Card.places.deleteButton);
    //console.log(cardInfo.link);
    this._placeImg.src = cardInfo.link;
    this._placeTitle.textContent = cardInfo.name;
    this._likeCounter.textContent = cardInfo.likes.length;
    this._placeImg.setAttribute("alt", cardInfo.name);
    //console.log(cardInfo._id);
    this._likesCheck = cardInfo.likes.some((liker) => {
      return liker._id === this._profileInfo._id;
    });

    //console.log(this._likesCheck);

    this._setEventListeners(cardInfo);
    //console.log(this_deleteButton);
    if (this._profileInfo._id !== cardInfo.owner._id) {
      this._deleteButton.remove();
    }
    if (this._likesCheck) {
      this._likeButton.classList.add(Card.places.likeButtonActive);
    }

    //const popupConfirmDelete = new Popup(Card.places.popupConfirmDelete);
    const popup = new Popup(Card.places.popupConfirmDelete);
    const formConfirmDelete = document.querySelector(
      Card.places.formConfirmDelete
    );

    //console.log(dbtn);
    //слушатель кнопки удаления карточки
    this._deleteButton.addEventListener("click", (evt) => {
      //popupConfirmDelete.open();
      popup.open();
      const itemButton = evt.currentTarget;
      popup.setEventListeners();
      //console.log(itemButton);
      //console.log(deleteButton);
      //const dbtn = () => {return this._deleteButton};
      //console.log(dbtn);
      formConfirmDelete.addEventListener("submit", (evt) => {
        //debugger;
        evt.preventDefault();
        // console.log(itemButton);
        //console.log(cardId);

        //запрос на сервер удаления карточки
        //console.log(dd.closest('.place'));
        //const item = dd.closest(Card.places.place);
        cardsInfo
          .deleteCard(cardInfo._id)
          .then(() => {
            //console.log(this.item);
            itemButton.closest(Card.places.place).remove();
            popup.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    return this._element;
  }

  _setEventListeners = (cardInfo) => {
    let likesCheck = this._likesCheck;
    const cardId = cardInfo._id;
    const likeCounter = this._likeCounter;
    const likeButton = this._likeButton;
    //console.log(this._deleteButton);
    //слушатель нажатия на картинку карточки
    this._placeImg.addEventListener("click", () => {
      //console.log(evt);
      this.handleCardClick(cardInfo);
    });

    //слушатель кнопки Like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(likesCheck, cardId, likeCounter, likeButton);
      likesCheck = !likesCheck;
    });
  };

  _handleLikeButtonClick(likesCheck, cardId, likeCounter, likeButton) {
    //console.log(likesCheck);
    //debugger;
    if (likesCheck) {
      //console.log(cardId);
      cardsInfo
        .deleteLikeCard(cardId)
        .then((data) => {
          //console.log(data);
          likeCounter.textContent = data.likes.length;
          likeButton.classList.toggle(Card.places.likeButtonActive);
        })
        .catch((err) => console.log(err));
    } else {
      cardsInfo
        .likeCard(cardId)
        .then((data) => {
          likeCounter.textContent = data.likes.length;
          likeButton.classList.toggle(Card.places.likeButtonActive);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
