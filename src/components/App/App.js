import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("loggedIn"));
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)

  const [submitStatus, setSubmitStatus] = React.useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = React.useState(false);
  const navigate = useNavigate();

  /*Обработчик добавления карточек в список "Сохраненные фильмы"*/
  function addToSavedMovies(data) {
    mainApi.saveMovie({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: 'https://api.nomoreparties.co' + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    })
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      }).catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 401') {
          handleLogout();
        }
        setIsSubmitSuccess(false);
        setSubmitStatus("При сохранении фильма произошла ошибка");
        setInfoTooltipOpen(true);
      })
  }

  /*Обработчик удаления карточек из списка "Сохраненные фильмы"*/
  function deleteFromSavedMovies(movieId) {
    mainApi.deleteMovie(movieId)
      .then((res) => {
        setSavedMovies((savedMovies) => {
          return savedMovies.filter((item) => {
            return item._id !== movieId;
          });
        });
      }).catch((err) => {
        console.log(err);
        setIsSubmitSuccess(false);
        setSubmitStatus("При удалении фильма произошла ошибка");
        setInfoTooltipOpen(true);
      })
  }

  /*Обработка обновление информации о пользователе*/
  function handleUpdateUser(userInfo) {
    mainApi.editUserInfo(userInfo)
      .then((newUser) => {
        setCurrentUser(newUser);
        setIsSubmitSuccess(true);
        setSubmitStatus("Данные пользователя успешно изменены");
        setInfoTooltipOpen(true);
      }).catch((err) => {
        console.log(err);
        setIsSubmitSuccess(false);
        if (err === "Ошибка: 409") {
          setSubmitStatus("Пользователь с таким email уже существует");
        } else {
          setSubmitStatus("При обновлении профиля произошла ошибка");
        }
        setInfoTooltipOpen(true);
      })
  }

  /*Обработчик авторизации пользователя*/
  function handleLogin(userData) {
    mainApi.authorize(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          mainApi.setToken(res.token);
          localStorage.setItem("loggedIn", true);
          navigate("/movies");
        }
      }).catch((err) => {
        console.log(err);
        setIsSubmitSuccess(false);
        if (err === 'Ошибка: 401') {
          setSubmitStatus("Вы ввели неправильный логин или пароль");
        } else if (err === 'Ошибка: 500') {
          setSubmitStatus("На сервере произошла ошибка");
        } else {
          setSubmitStatus("При авторизации произошла ошибка. Переданный токен некорректен");
        }
        setInfoTooltipOpen(true);
      })
  }

  /*Обработчик регистрации пользователя*/
  function handleRegistration(userData) {
    mainApi.register(userData)
      .then((res) => {
        setIsSubmitSuccess(true)
        handleLogin(userData);
        setSubmitStatus("Вы успешно зарегистрировались");
        setInfoTooltipOpen(true);
      }).catch((err) => {
        console.log(err);
        setIsSubmitSuccess(false);
        if (err === 'Ошибка: 401') {
          setSubmitStatus("Пользователь с таким email уже существует");
        } else {
          setSubmitStatus("При регистрации пользователя произошла ошибка");
        }
        setInfoTooltipOpen(true);
      })
  }

  /* Обработчик выхода из системы*/
  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    mainApi.setToken("");
    navigate("/");
  }

  /*Проверяем пользователя*/
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo()
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogout();
        })
    } else {
      handleLogout();
    }
  }, [loggedIn]);// eslint-disable-line


  /*Получаем список сохраненных карточек*/
  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getSaveMovies()
        .then((movies) => {
          setSavedMovies(movies);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContext.Provider value={{ savedMovies }}>
        <div className="page">
          <Routes>
            <Route path='/' element={
              <Main
                loggedIn={loggedIn}
              />}
            />
            <Route path='/movies' element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                onSaveMovie={addToSavedMovies}
                onDeleteMovie={deleteFromSavedMovies}
              />}
            />
            <Route path='/saved-movies' element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                onDeleteMovie={deleteFromSavedMovies}
              />}
            />
            <Route path='/profile' element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                handleLogout={handleLogout}
                onUpdateUser={handleUpdateUser}
              />}
            />
            <Route path='/signup' element={
              <Register
                handleRegistration={handleRegistration}
                loggedIn={loggedIn}
              />}
            />
            <Route path='/signin' element={
              <Login
                handleLogin={handleLogin}
                loggedIn={loggedIn}
              />}
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            submitStatus={submitStatus}
            isSubmitSuccess={isSubmitSuccess}
          />
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
