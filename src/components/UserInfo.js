import { config, } from "../utils/util";
class UserInfo {
  constructor(selectorProfileName, selectorProfileDescription) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileDescription = document.querySelector(selectorProfileDescription);
  }

  getUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
    //let profileInfo;
   //return profileInfo = userData;
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then(checkResp);
  }
}

export const userInfo = new UserInfo('.profile__title', '.profile__paragraph');

//const profileName = document.querySelector(".profile__title");
//const profileDescription = document.querySelector(".profile__paragraph");
