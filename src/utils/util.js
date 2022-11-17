const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-15",
  headers: {
    authorization: "6e42217e-2177-4476-b93c-c82e4a9b29ea",
    "Content-Type": "application/json",
  },
};
//16
//9656253c-3dfe-4770-aeca-f882bc2dc634


function checkResp(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Произошла ошибка ${res.status}`);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function renderLoading(form, baseText, status) {
  const button = form.querySelector(".popup__submit-button");
  if (status === true) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = baseText;
  }
}

const disableButton = (popup) => {
  const submitButton = popup.querySelector(".popup__submit-button");
  submitButton.disabled = true;
  submitButton.classList.add("popup__submit-button_disabled");
};

export {
  config,
  checkResp,
  renderLoading,
  openPopup,
  closePopup,
  disableButton,
};
