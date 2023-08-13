class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: "GET",
            headers: this._headers,
        }).then(this._checkStatus);
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "content-type": "application/json",
        "Authorization": "",
    }
});

export default moviesApi;