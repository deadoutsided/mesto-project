import "../index.css";

import { FormValidator } from "../components/Validate";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { disableButton, renderLoading } from "../utils/util";
import { validationList, placesContainer, buttonEdit, buttonAvatar,
  popAdd, popAvatar, buttonAdd, editForm, formName, formDescription,
  profileName, profileDescription, profileImg, addForm, cardPopup,
  placeTemplate, avatarForm } from "../utils/constants";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { cardsInfo } from "../components/CardsInfo";
import { userInfo } from "../components/UserInfo";

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
      handleCardClick,
      popDelConfirm
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
  popupWithImage.open(cardInfo.link, cardInfo.name);
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
          handleCardClick,
          popDelConfirm
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

const popupWithImage = new PopupWithImage(cardPopup);
const popDelConfirm = new PopupWithForm(".popup_type_confirm-delete",{
handleFormSubmit: () => {}});
popupWithImage.setEventListeners();

//enableValidation({validationList});
const editFormValidator = new FormValidator(validationList, editForm);
const addFormValidator = new FormValidator(validationList, addForm);
const avatarFormValidator = new FormValidator(validationList, avatarForm);


buttonEdit.addEventListener("click", () => {
  editFormValidator.enableValidation();
  profilePopup.open();
  formDescription.value = profileDescription.textContent;
  formName.value = profileName.textContent;
});

buttonAdd.addEventListener("click", () => {
  disableButton(popAdd);
  addFormValidator.enableValidation();
  addCardPopup.open();
  
});

buttonAvatar.addEventListener("click", () => {
  disableButton(popAvatar);
  avatarFormValidator.enableValidation();
  avatarPopup.open();  
});

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
avatarPopup.setEventListeners();
