export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}. ${res.statusText}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      headers: this._headers,
    }).then(this._getData)
  }

  setUserInfo(body) {
    return fetch(this._baseUrl + `/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
      // {name: "asd", about: "asd"}
    }).then(this._getData)
  }

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      headers: this._headers,
    }).then(this._getData)
  }

  addNewCard(body) {
    return fetch(this._baseUrl + `/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
      // {name: "asd", link: "asd"}
    }).then(this._getData)
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/` + id, {
      method: 'DELETE',
      headers: this._headers,
      // {name: "asd", link: "asd"}
    }).then(this._getData)
  }

  likeCard(id) {
    return fetch(this._baseUrl + `/cards/` + id + '/likes', {
      method: 'PUT',
      headers: this._headers,

    }).then(this._getData)
  }

  removeLikeCard(id) {
    return fetch(this._baseUrl + `/cards/` + id + '/likes', {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getData)
  }

  setUserAvatar(avatar) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    }).then(this._getData)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    authorization: 'a7be79c3-197b-4b62-bc05-c705055e13fb',
    'Content-Type': 'application/json'
  }
}); 
