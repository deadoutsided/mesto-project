import "../index.css";

import { config } from "../utils/constants";
import { FormValidator } from "../components/Validate";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { disableButton, renderLoading } from "../utils/util";
import {
  validationList,
  placesContainer,
  buttonEdit,
  buttonAvatar,
  popAdd,
  popAvatar,
  buttonAdd,
  editForm,
  formName,
  formDescription,
  profileName,
  profileDescription,
  profileImg,
  addForm,
  cardPopup,
  placeTemplate,
  avatarForm,
} from "../utils/constants";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Api } from "../components/Api";
import { cardsInfo } from "../components/CardApi";
import { userInfo } from "../components/UserInfo";

let profileInfo;

//Серверная часть обработки данных пользователя
async function getUserInfo() {
  const api = new Api(config);
  const result = await api.requireApi("/users/me");
  userInfo.putUserInfo(result);
  return result;
}

async function setUserInfo(name, about) {
  const api = new Api(config);
  const result = await api.requireApi(
    "/users/me",
    { name: `${name}`, about: `${about}` },
    "PATCH"
  );
  userInfo.putUserInfo(result);
  return result;
}

async function updateAvatar(newImg) {
  const api = new Api(config);
  return await api.requireApi("/users/me/avatar", { avatar: newImg }, "PATCH");
}

Promise.all([getUserInfo(), cardsInfo.getCards()])
  .then(([userData, cards]) => {
    //console.log(userData);
    profileImg.src = userData.avatar;
    profileInfo = userData;
    //console.log(cards);
    const itemList = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          const newCard = new Card(
            placeTemplate,
            placesContainer,
            cardItem,
            profileInfo,
            handleCardClick,
            handleLikeButtonClick,
            handleDelButtonClick
          );
          //console.log(cardItem);
          const cardElement = newCard.generate(cardItem);
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

function handleCardClick(evt) {
  //console.log(cardInfo);
  popupWithImage.open(evt.target.currentSrc, evt.target.alt);
}

const profilePopup = new PopupWithForm(".popup_type_edit-profile", {
  handleFormSubmit: (formData) => {
    renderLoading(editForm, "Сохранить", true);
    setUserInfo(formData.name, formData.nickname)
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
    updateAvatar(formData["avatar-url"])
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
          handleLikeButtonClick,
          handleDelButtonClick
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

//Серверная и исполнительная части обработки данных карточек
//Обработчик лайков
function handleLikeButtonClick(likesCheck, dataCard) {
  if (likesCheck) {
    cardsInfo
      .deleteLikeCard(dataCard._cardInfo._id)
      .then((data) => {
        //console.log(data.likes.length);
        dataCard.togglLike(data);
      })
      .catch((err) => console.log(err));
  } else {
    cardsInfo
      .likeCard(dataCard._cardInfo._id)
      .then((data) => {
        dataCard.togglLike(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//Обработчики удаления
let itemDelButton;
let dataDelCard;
function handleDelButtonClick(evt, dataCard) {
  popDelConfirm.open();
  itemDelButton = evt.currentTarget;
  dataDelCard = dataCard;
  //console.log(itemDelButton, dataDelCard);
}

const popDelConfirm = new PopupWithForm(".popup_type_confirm-delete", {
  handleFormSubmit,
});

function handleFormSubmit() {
  //console.log(itemDelButton, dataDelCard);
  cardsInfo
    .deleteCard(dataDelCard._cardInfo._id)
    .then(() => {
      dataDelCard.removeCard(itemDelButton);
      popDelConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
//Попап картинки
const popupWithImage = new PopupWithImage(cardPopup);

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
popupWithImage.setEventListeners();
popDelConfirm.setEventListeners();
