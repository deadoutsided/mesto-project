class UserInfo {
  constructor({ selectorProfileName, selectorProfileDescription }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileDescription = document.querySelector(
      selectorProfileDescription
    );
  }

  putUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
  }
}

export const userInfo = new UserInfo({
  selectorProfileName: ".profile__title",
  selectorProfileDescription: ".profile__paragraph",
});
