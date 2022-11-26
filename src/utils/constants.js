const validationList = {
    //formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__field-error_active",
  };

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "6e42217e-2177-4476-b93c-c82e4a9b29ea",
    "Content-Type": "application/json",
  },
};
const placesContainer = document.querySelector(".places");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAvatar = document.querySelector(".profile__avatar-button");
const popAdd = document.querySelector(".popup_type_add-place");
const popAvatar = document.querySelector(".popup_type_avatar");
const buttonAdd = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".popup__form_content_edit-profile");
const formName = editForm.querySelector(".popup__field_info_name");
const formDescription = editForm.querySelector(".popup__field_info_desc");
const profileName = ".profile__title";
const profileDescription = ".profile__paragraph";
const profileImg = ".profile__img";
const addForm = popAdd.querySelector(".popup__form");
const cardPopup = ".popup_type_place";
const placeTemplate = "#card-template";
const avatarForm = popAvatar.querySelector(".popup__form");



export {
  validationList,
  config,
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
  avatarForm
}
