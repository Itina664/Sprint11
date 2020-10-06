export default class Api {
    constructor(baseUrl, headers) {
      this.baseUrl = baseUrl;
      this.headers = headers;
    }

    getInfoProfile() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.headers
            })
        .then(res => {
            return this._getResponseData(res) 
        })
    };

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getInfoCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
        .then(res => {
            return this._getResponseData(res) 
        })
    };

    patchInfoProfile(name, about) {  
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
              name: name,
              about: about
            })
        })
        .then(res => {
            return this._getResponseData(res)
        }) 
    };
}