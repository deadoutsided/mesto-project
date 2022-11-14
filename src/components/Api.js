import { config, checkResp, } from "../utils/util";
class Api {
	constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers= config.headers;
	}

getUserInfo () {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: this._headers,
  }).then(checkResp);
}

setUserInfo (name, about) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`,
    }),
  }).then(checkResp);
}

getCards () {
  return fetch(`${this._baseUrl}/cards`, {
    method: "GET",
    headers: this._headers,
  }).then(checkResp);
}

postCard (cardName, cardImg) {
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: cardName,
      link: cardImg,
    }),
  }).then(checkResp);
}

deleteCard (cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  }).then(checkResp);
}

likeCard (cardId) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: this._headers,
  }).then(checkResp);
}

deleteLikeCard (cardId) {
  return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: this._headers,
  }).then(checkResp);
}

updateAvatar (newImg) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar: newImg,
    }),
  }).then(checkResp);
}
}

export const reqvest = new Api(config);
