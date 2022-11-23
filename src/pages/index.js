import "../index.css";

import { FormValidator } from "../components/Validate";
import { Card } from "../components/Card";
import {
  disableButton,
  renderLoading,
} from "../utils/util";

import { validationList } from "../utils/constants";
import {PopupWithImage} from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { cardsInfo } from "../components/CardsInfo";
import { userInfo } from "../components/UserInfo";

const placesContainer = document.querySelector(".places");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAvatar = document.querySelector(".profile__avatar-button");
//const popEdit = document.querySelector(".popup_type_edit-profile");
const popAdd = document.querySelector(".popup_type_add-place");
const popAvatar = document.querySelector(".popup_type_avatar");
const buttonAdd = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".popup__form_content_edit-profile");
const formName = editForm.querySelector(".popup__field_info_name");
const formDescription = editForm.querySelector(".popup__field_info_desc");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__paragraph");
const profileImg = document.querySelector(".profile__img");
const addForm = popAdd.querySelector(".popup__form");
const cardName = addForm.querySelector(".popup__field_info_card-name");
const cardUrl = addForm.querySelector(".popup__field_info_card-img");
//const cardPopup = document.querySelector(".popup_type_place");
const cardPopup = ".popup_type_place";
//const cardPopupName = cardPopup.querySelector(".popup__subtitle");
//const cardPopupImg = cardPopup.querySelector(".popup__img");
const closeButtons = document.querySelectorAll(".popup__close-button");
const placeTemplate = "#card-template";
const popups = document.querySelectorAll(".popup__overlay");
const avatarFormImg = popAvatar.querySelector(".popup__field_info_avatar");
const avatarForm = popAvatar.querySelector(".popup__form");
let profileInfo;

//console.log(reqvest);
Promise.all([userInfo.getUserInfo(), cardsInfo.getCards()])
  .then(([userData, cards]) => {
    //console.log(userData);
    //console.log(cards);
    profileImg.src = userData.avatar;
    profileInfo = userData;
    const cardList = new Card(
      placeTemplate,
      placesContainer,
      cards,
      profileInfo,
      handleCardClick
    );
    //console.log(handleCardClick);
    //console.log(cardList._getElement());
    //console.log(cardList._generate(cards[0]));
    //console.log(cards);
    cardList.addCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardClick(cardInfo) {
  //console.log(cardInfo);
  const popupWithImage = new PopupWithImage(cardPopup);
  popupWithImage.open(cardInfo.link, cardInfo.name);
}

const profilePopup = new PopupWithForm('.popup_type_edit-profile',
  {handleFormSubmit: (formData) => {
    renderLoading(editForm, "Сохранить", true);
    userInfo.setUserInfo(formData.name, formData.nickname)    
    .then(user => {
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        profilePopup.close();
    })
    .catch((err) => {
        alert(err);
    })
    .finally(() => {              
      renderLoading(editForm, "Сохранить", false);
    });
  }
});

const avatarPopup = new PopupWithForm('.popup_type_avatar',
  {handleFormSubmit: (formData) => {
    renderLoading(avatarForm, "Сохранить", true);
    userInfo
    .updateAvatar(formData['avatar-url'])
    .then((data) => {
      //console.log(data);
      profileImg.src = data.avatar;
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(avatarForm, "Сохранить", false);
    });
  }
});

/*function handlePopAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(popAvatar, "Сохранить", true);
  userInfo
    .updateAvatar(avatarFormImg.value)
    .then((data) => {
      //console.log(data);
      profileImg.src = data.avatar;
      closePopup(popAvatar);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popAvatar, "Сохранить", false);
    });
}*/

/*function handleProfileFormSubmit(evt, formName, formDescription, popup) {
  evt.preventDefault();
  renderLoading(popup, "Сохранить", true);
  userInfo
    .setUserInfo(formName.value, formDescription.value)
    .then(() => {
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popup, "Сохранить", false);
    });
}*/

const addCardPopup = new PopupWithForm('.popup_type_add-place',
  {handleFormSubmit: (formData) => {
    renderLoading(addForm, "Создать", true);
    cardsInfo
    .postCard(formData['place-title'], formData['image-url'])
    .then((data) => {
      //console.log(data);
      //debugger;
      const newCard = new Card(
        placeTemplate,
        placesContainer,
        data,
        profileInfo,
        handleCardClick
      );
      newCard.addCards(data);
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popAdd, "Создать", false);
    });
  }
});

/*function handleformSubmitCardAdd(evt, name, url) {
  console.log(evt);
  //debugger;
  evt.preventDefault();
  renderLoading(popAdd, "Создать", true);
  cardsInfo
    .postCard(name.value, url.value)
    .then((data) => {
      console.log(data);
      //debugger;
      const newCard = new Card(
        placeTemplate,
        placesContainer,
        data,
        profileInfo,
        handleCardClick
      );
      newCard.addCards(data);
      closePopup(popAdd);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popAdd, "Создать", false);
    });
}*/

/*popAvatar.addEventListener("submit", (evt) => {
  handlePopAvatarSubmit(evt);
});*/

//enableValidation({validationList});
const editFormValidator = new FormValidator(validationList, editForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationList, addForm);
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationList, avatarForm);
avatarFormValidator.enableValidation();

/*closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});*/

/*editForm.addEventListener("submit", (evt) =>
  handleProfileFormSubmit(evt, formName, formDescription, popEdit)
);*/

buttonEdit.addEventListener("click", () => {
  profilePopup.open();
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;
});

buttonAdd.addEventListener("click", () => {
  addCardPopup.open();
  disableButton(popAdd);
});
buttonAvatar.addEventListener("click", () => {
  avatarPopup.open();
  disableButton(popAvatar);
});

/*addForm.addEventListener("submit", (evt) =>
  handleformSubmitCardAdd(evt, cardName, cardUrl)
);*/

//popups.forEach(setExitPopupListeners);
