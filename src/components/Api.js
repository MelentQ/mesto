export default class Api {
  /**
   * Класс для работы с API Mesto
   * @param {*} address базовый адрес, например https://mesto.nomoreparties.co/v1/cohort-24
   * @param {*} token токен, например 68a2e8bf-41f6-4309-86d1-09aae1dd8e56
   */
  constructor(address, token) {
    this._address = address;
    this._token = token;
  }

  /**
   * 
   * @returns Возвращает начальные карточки с сервера
   */
  getCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * 
   * @returns Возвращает данные пользователя с сервера
   */
  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Назначает новые данные пользователя
   * @param {*} name - имя пользователя
   * @param {*} about - о пользователе
   * @returns Возвращает готовый объект, содержащий все обновленные данные пользователя
   */
  setProfileInfo(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Назначает новый аватар пользователя
   * @param {*} link - ссылка на изображение
   * @returns Возвращает готовый объект, содержащий все обновленные данные пользователя
   */
  setUserAvatar(link) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Добавляет на сервер новую карточку
   * @param {*} name - имя карточки
   * @param {*} link - ссылка на карточку
   * @returns Возвращает готовый объект с данными карточки
   */
  addCard(name, link) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Лайк карточки
   * @param {*} cardId - идентификатор карточки
   * @returns Возвращает готовый объект с данными карточки
   */
  likeCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Убирает лайк с карточки
   * @param {*} cardId - идентификатор карточки
   * @returns Возвращает готовый объект с данными карточки
   */
  removeLikeFromCard(cardId) {
    return fetch(`${this._address}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  /**
   * Удаляет карточку
   * @param {*} cardId - идентификатор карточки
   */
  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
}