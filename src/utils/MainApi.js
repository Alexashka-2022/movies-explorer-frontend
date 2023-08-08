class MainApi {
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

    _request(url, options) {
        return fetch(url, options)
            .then(this._checkStatus);
    }

    register(data) {
        return this._request(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            }),
        })
    }

    authorize(data) {
        return this._request(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        })
    }

    checkToken(token) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    }

    setToken(token) {
        this._headers.Authorization = `Bearer ${token}`;
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }

    editUserInfo({ name, email }) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ name, email })
        })
    }

    saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
    }) {
        return this._request(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                movieId,
                nameRU,
                nameEN,
            })
        })
    }

    deleteMovie(id) {
        return this._request(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }

    getSaveMovies() {
        return this._request(`${this._baseUrl}/movies`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
    }
}

const mainApi = new MainApi({
    baseUrl: 'https://api.shmakov.diploma.nomoredomains.work',
    headers: {
        "Content-Type": "application/json",
    },
});

export default mainApi;