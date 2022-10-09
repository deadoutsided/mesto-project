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
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers
  })
};

const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

const updateAvatar = (newImg) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newImg
    })
  })
}

function renderLoading(form, baseText, status){
  const button = form.querySelector('.popup__submit-button');
  if (status === true){
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = baseText;
  }
}

export { config, getUserInfo, setUserInfo, getCards, postCard, deleteCard, likeCard, deleteLikeCard, updateAvatar, renderLoading }
