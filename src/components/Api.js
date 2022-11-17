import { config,} from "../utils/util";
class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  async _requireApi(url = "", body, method = "GET") {
    let options = {
      method,
      headers: this._headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(`${this._baseUrl}${url}`, options);
    const contentType = response.headers.get("Content-Type");
    if (contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    } else {
      throw Error(`Произошла ошибка ${response.status}`);
    }
  }

  async getUserInfo() {
    return await this._requireApi("/users/me");
  }

  async setUserInfo(name, about) {
    return await this._requireApi(
      "/users/me",
      { name: `${name}`, about: `${about}` },
      "PATCH"
    );
  }

  async getCards() {
    return await this._requireApi("/cards");
  }

  async postCard(cardName, cardImg) {
    return await this._requireApi(
      "/cards",
      { name: cardName, link: cardImg },
      "POST"
    );
  }

  async deleteCard(cardId) {
    return await this._requireApi(`/cards/${cardId}`, {}, "DELETE");
  }

  async likeCard(cardId) {
    return await this._requireApi(`/cards/likes/${cardId}`, {}, "PUT");
  }

  async deleteLikeCard(cardId) {
    return await this._requireApi(`/cards/likes/${cardId}`, {}, "DELETE");
  }

  async updateAvatar(newImg) {
    return await this._requireApi(
      "/users/me/avatar",
      { avatar: newImg },
      "PATCH"
    );
  }
}

export const reqvest = new Api(config);
