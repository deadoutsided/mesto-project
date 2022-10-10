import { checkResp } from './util.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: '6e42217e-2177-4476-b93c-c82e4a9b29ea',
    'Content-Type': 'application/json'
  }
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
};

const setUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
  .then(checkResp)
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
};

const postCard = (cardName, cardImg) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardImg
    })
  })
  .then(checkResp)
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResp)
}

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResp)
};

const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResp)
};

const updateAvatar = (newImg) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newImg
    })
  })
  .then(checkResp)
}

export { config, getUserInfo, setUserInfo, getCards, postCard, deleteCard, likeCard, deleteLikeCard, updateAvatar, checkResp }
