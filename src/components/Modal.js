import { closePopup, renderLoading } from '../utils/util';
import { addCards } from './Card';
import { reqvest } from './Api';

function setExitPopupListeners(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__overlay')) {
      closePopup(evt.target.closest('.popup'));
    }
  });
}

function handleformSubmitCardAdd(
  evt,
  name,
  url,
  template,
  subtitle,
  cardImg,
  cardPopup,
  profileInfo,
  popup,
  container
) {
  evt.preventDefault();
  renderLoading(popup, 'Создать', true);
  reqvest.postCard(name.value, url.value)
    .then((data) => {
      addCards(
        container,
        data,
        template,
        subtitle,
        cardImg,
        cardPopup,
        profileInfo
      );
      closePopup(popup);
      evt.target.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(popup, 'Создать', false);
    });
}

function handleProfileFormSubmit(
  evt,
  profileName,
  formName,
  profileDescription,
  formDescription,
  popup
) {
  evt.preventDefault();
  renderLoading(popup, 'Сохранить', true);
  reqvest.setUserInfo(formName.value, formDescription.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(popup, 'Сохранить', false);
    });
}

export {
  setExitPopupListeners,
  handleProfileFormSubmit,
  handleformSubmitCardAdd,
};
