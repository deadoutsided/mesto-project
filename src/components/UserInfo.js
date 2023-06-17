import {
  profileName,
  profileDescription,
  profileImg,
} from "../utils/constants";

class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
  }

  putUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
  }

  getUserInfo() {
    const obj ={};
    obj.name = this._profileName.textContent;
    obj.description = this._profileDescription.textContent;
    return obj;
  }

  putAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}

export const userInfo = new UserInfo({
  profileName: profileName,
  profileDescription: profileDescription,
  profileAvatar: profileImg,
});
