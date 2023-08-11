import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';

function MoviesCard(props) {
    const { pathname } = useLocation();
    const [isSavedFilm, setSavedFilm] = React.useState(false);
    const { savedMovies } = React.useContext(SavedMoviesContext);

    function getMovieDuration(minutes) {
        if (minutes > 60) {
            return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`
        } else if (minutes === 60) {
            return "1ч"
        } else {
            return `${minutes} минут`
        }
    }

    const saveMovie = savedMovies.find((item) => {
        if (pathname === "/movies") {
            return item.movieId === props.card.id;
        } else {
            return props.card.movieId === item.movieId
        }
    });

    function deleteMovie() {
        props.onDeleteMovie(saveMovie._id);
    }

    function toggleToSaveMovie() {
        if (isSavedFilm) {
            deleteMovie();
        } else {
            props.onSaveMovie(props.card);
        }
    }

    React.useEffect(() => {
        setSavedFilm(pathname === "/movies"
            ? savedMovies.some((savedMovie) => {
                return savedMovie.movieId === props.card.id;
            })
            : true)
    }, [pathname, props.card.id, savedMovies])

    return (
        <li className="card">
            <div className="card__description">
                <h2 className="card__title">{props.card.nameRU}</h2>
                <p className="card__duration">{getMovieDuration(props.card.duration)}</p>
            </div>
            <a href={props.card.trailerLink} className="card__link" target="_blank" rel="noreferrer">
                <img className="card__cover" src={
                    pathname === "/movies"
                        ? `https://api.nomoreparties.co${props.card.image.url}`
                        : props.card.image
                } alt={`обложка фильма ${props.card.nameRU}`} />
            </a>
            {pathname === "/movies" ? (
                <button type="button" className={`card__add-button ${isSavedFilm && "card__save-button"}`} onClick={toggleToSaveMovie} >{`${isSavedFilm ? "" : "Сохранить"}`}</button>
            ) : (<button type="button" className="card__add-button card__delete-button" onClick={deleteMovie}></button>
            )}
        </li>
    );
}

export default MoviesCard;