//16
//9656253c-3dfe-4770-aeca-f882bc2dc634

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
  //config,
  renderLoading,
  disableButton,
};
