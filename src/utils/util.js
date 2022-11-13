import { toggleButtonState } from '../components/Validate';

function checkResp(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Произошла ошибка ${res.status}`);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function renderLoading(form, baseText, status) {
  const button = form.querySelector('.popup__submit-button');
  if (status === true) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = baseText;
  }
}

const disableButton = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__field'));
  const submitButton = popup.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton, 'popup__submit-button_disabled');
};

export { renderLoading, openPopup, closePopup, checkResp, disableButton };
