import { cardsInfo } from "./CardApi";

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
    handleCardClick,
    popDelConfirm
  ) {
    this._selectorTemplate = selectorTemplate;
    this._container = container;
    this._cardsInfo = cardsInfo;
    this._profileInfo = profileInfo;
    this.handleCardClick = handleCardClick;
    this._popDelConfirm = popDelConfirm;
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

    const popupConfirmDelete = new Popup(Card.places.popupConfirmDelete);
    const formConfirmDelete = document.querySelector(
      Card.places.formConfirmDelete
    );

    //слушатель кнопки удаления карточки
    this._deleteButton.addEventListener("click", (evt) => {
      popupConfirmDelete.open();
      const itemButton = evt.currentTarget;
      formConfirmDelete.addEventListener("submit", (evt) => {
        evt.preventDefault();
        cardsInfo
          .deleteCard(cardInfo._id)
          .then(() => {
            //console.log(this.item);
            itemButton.closest(Card.places.place).remove();
            popupConfirmDelete.close();
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
    //слушатель нажатия на картинку карточки
    this._placeImg.addEventListener("click", () => {
      this.handleCardClick(cardInfo);
    });

    //слушатель кнопки Like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(likesCheck, cardId, likeCounter, likeButton);
      likesCheck = !likesCheck;
    });
  };

  _handleLikeButtonClick(likesCheck, cardId, likeCounter, likeButton) {
    if (likesCheck) {
      cardsInfo
        .deleteLikeCard(cardId)
        .then((data) => {
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
