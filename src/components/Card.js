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
  _cardsInfo;
  _profileInfo;

  constructor(
    selectorTemplate,
    cardInfo,
    profileInfo,
    handleCardClick,
    handleLikeButtonClick,
    handleDelButtonClick
  ) {
    this._selectorTemplate = selectorTemplate;
    this._cardInfo = cardInfo;
    this._profileInfo = profileInfo;
    this.handleCardClick = handleCardClick;
    this.handleLikeButtonClick = handleLikeButtonClick;
    this.handleDelButtonClick = handleDelButtonClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(Card.places.place)
      .cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._placeImg = this._element.querySelector(Card.places.image);
    this._placeTitle = this._element.querySelector(Card.places.title);
    this._likeCounter = this._element.querySelector(Card.places.likeCounte);
    this._likeButton = this._element.querySelector(Card.places.likeButton);
    this._deleteButton = this._element.querySelector(Card.places.deleteButton);
    //console.log(cardInfo.link);
    this._placeImg.src = this._cardInfo.link;
    this._placeTitle.textContent = this._cardInfo.name;
    this._likeCounter.textContent = this._cardInfo.likes.length;
    this._placeImg.setAttribute("alt", this._cardInfo.name);
    console.log(cardInfo._id);
    this._likesCheck = this._cardInfo.likes.some((liker) => {
      return liker._id === this._profileInfo._id;
    });

    this._setEventListeners();
    //console.log(this_deleteButton);
    if (this._profileInfo._id !== this._cardInfo.owner._id) {
      this._deleteButton.remove();
    }
    if (this._likesCheck) {
      this._likeButton.classList.add(Card.places.likeButtonActive);
    }

    return this._element;
  }

  togglLike = (data) => {
    this._likeCounter.textContent = data.likes.length;
    this._likeButton.classList.toggle(Card.places.likeButtonActive);
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  }


  _setEventListeners = () => {
    let likesCheck = this._likesCheck;
    //слушатель нажатия на картинку карточки
    this._placeImg.addEventListener("click", (evt) => {
      this.handleCardClick(evt);
    });

    //слушатель кнопки Like
    this._likeButton.addEventListener("click", () => {
      this.handleLikeButtonClick(likesCheck, this);
      likesCheck = !likesCheck;
    });

    //слушатель кнопки удаления карточки
    this._deleteButton.addEventListener("click", () => {
      this.handleDelButtonClick(this);
    });
  };
}
