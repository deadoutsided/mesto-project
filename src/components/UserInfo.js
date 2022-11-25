import { config } from "../utils/constants";
import { Api } from "./Api";
class UserInfo extends Api {
  constructor(config, { selectorProfileName, selectorProfileDescription }) {
    super(config);
    this._profileName = document.querySelector(selectorProfileName);
    this._profileDescription = document.querySelector(
      selectorProfileDescription
    );
  }

  _putUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
  }

  async getUserInfo() {
    const result = await super._requireApi("/users/me");
    this._putUserInfo(result);
    return result;
  }

  async setUserInfo(name, about) {
    const result = await super._requireApi(
      "/users/me",
      { name: `${name}`, about: `${about}` },
      "PATCH"
    );
    this._putUserInfo(result);
    return result;
  }

  async updateAvatar(newImg) {
    return await super._requireApi(
      "/users/me/avatar",
      { avatar: newImg },
      "PATCH"
    );
  }
}

export const userInfo = new UserInfo(config, {
  selectorProfileName: ".profile__title",
  selectorProfileDescription: ".profile__paragraph",
});
