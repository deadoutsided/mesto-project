import "../index.css";

import { FormValidator } from "../components/Validate";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { disableButton, renderLoading } from "../utils/util";

import { validationList } from "../utils/constants";
import { PopupWithImage } from "../components/PopupWithImage";
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

//const cardPopup = document.querySelector(".popup_type_place");
const cardPopup = ".popup_type_place";
//const cardPopupName = cardPopup.querySelector(".popup__subtitle");
//const cardPopupImg = cardPopup.querySelector(".popup__img");

const placeTemplate = "#card-template";

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
    const itemList = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          //console.log(cards);
          const cardElement = cardList.generate(cardItem);
          itemList.setItem(cardElement);
        },
      },
      ".places"
    );
    itemList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardClick(cardInfo) {
  //console.log(cardInfo);
  const popupWithImage = new PopupWithImage(cardPopup);
  popupWithImage.open(cardInfo.link, cardInfo.name);
  popupWithImage.setEventListeners();
}

const profilePopup = new PopupWithForm(".popup_type_edit-profile", {
  handleFormSubmit: (formData) => {
    renderLoading(editForm, "Сохранить", true);
    userInfo
      .setUserInfo(formData.name, formData.nickname)
      .then((user) => {
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
  },
});

const avatarPopup = new PopupWithForm(".popup_type_avatar", {
  handleFormSubmit: (formData) => {
    renderLoading(avatarForm, "Сохранить", true);
    userInfo
      .updateAvatar(formData["avatar-url"])
      .then((data) => {
        profileImg.src = data.avatar;
        avatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(avatarForm, "Сохранить", false);
      });
  },
});

const addCardPopup = new PopupWithForm(".popup_type_add-place", {
  handleFormSubmit: (formData) => {
    renderLoading(addForm, "Создать", true);
    cardsInfo
      .postCard(formData["place-title"], formData["image-url"])
      .then((data) => {
        const newCard = new Card(
          placeTemplate,
          placesContainer,
          data,
          profileInfo,
          handleCardClick
        );

        const itemNew = new Section(
          {
            items: data,
            renderer: (cardItem) => {
              //console.log(data);
              const cardElement = newCard.generate(cardItem);
              itemNew.setItem(cardElement);
            },
          },
          ".places"
        );
        itemNew.renderItems();
        //newCard.addCards(data);
        addCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        renderLoading(addForm, "Создать", false);
      });
  },
});

//enableValidation({validationList});
const editFormValidator = new FormValidator(validationList, editForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationList, addForm);
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationList, avatarForm);
avatarFormValidator.enableValidation();

buttonEdit.addEventListener("click", () => {
  profilePopup.open();
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;
});
profilePopup.setEventListeners();

buttonAdd.addEventListener("click", () => {
  addCardPopup.open();
  disableButton(popAdd);
});
addCardPopup.setEventListeners();

buttonAvatar.addEventListener("click", () => {
  avatarPopup.open();
  disableButton(popAvatar);
});
avatarPopup.setEventListeners();
