import {
  profileName,
  profileDescription,
  profileImg,
} from "../utils/constants";

class UserInfo {
  constructor({
    selectorProfileName,
    selectorProfileDescription,
    selectorProfileAvatar,
  }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileDescription = document.querySelector(
      selectorProfileDescription
    );
    this._profileAvatar = document.querySelector(selectorProfileAvatar);
  }

  putUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
  }

  putAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}

export const userInfo = new UserInfo({
  selectorProfileName: profileName,
  selectorProfileDescription: profileDescription,
  selectorProfileAvatar: profileImg,
});
