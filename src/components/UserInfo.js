import { config } from "../utils/util";
import { Api } from "./Api";
class UserInfo extends Api {
  constructor(config, selectorProfileName, selectorProfileDescription) {
    super(config);
    this._profileName = document.querySelector(selectorProfileName);
    this._profileDescription = document.querySelector(
      selectorProfileDescription
    );
  }

  async getUserInfo() {
    return await super._requireApi("/users/me");
  }

putUserInfo(userData) {
  this._profileName.textContent = userData.name;
  this._profileDescription.textContent = userData.about;
}

  async setUserInfo(name, about) {
    return await super._requireApi(
      "/users/me",
      { name: `${name}`, about: `${about}` },
      "PATCH"
    );
  }

  async updateAvatar(newImg) {
    return await super._requireApi(
      "/users/me/avatar",
      { avatar: newImg },
      "PATCH"
    );
  }
}

export const userInfo = new UserInfo(
  config,
  ".profile__title",
  ".profile__paragraph"
);
