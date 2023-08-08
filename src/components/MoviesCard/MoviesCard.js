import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
    const { pathname } = useLocation();
    const [isSavedFilm, setSavedFilm] = React.useState(false);
    const savedMovies = props.savedMovies;


    function getMovieDuration(minutes) {
        if (minutes > 60) {
            return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`
        } else if (minutes === 60) {
            return "1ч"
        } else {
            return `${minutes} минут`
        }
    }

    function deleteMovie() {
        props.onDeleteMovie(props.id)
        setSavedFilm(false);
    }

    function toggleToSaveMovie() {
        props.onSaveMovie(props.card);
        setSavedFilm(true);
    }
    React.useEffect(() => {
        if (pathname === "/movies") {
            setSavedFilm(savedMovies.some((item) => {
                return item.movieId === props.card.id;
            }))
        } else if (pathname === "/saved-movies") {
            savedMovies.some((item) => {
                return item.movieId === props.card.movieId;
            })
        }
    }, [savedMovies, props.card.movieId, props.card.id, pathname])

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
                <button type="button" className={`card__add-button ${isSavedFilm && "card__save-button"}`} onClick={!isSavedFilm ? toggleToSaveMovie : undefined} >{`${isSavedFilm ? "" : "Сохранить"}`}</button>
            ) : (<button type="button" className="card__add-button card__delete-button" onClick={deleteMovie}></button>
            )}
        </li>
    );
}

export default MoviesCard;