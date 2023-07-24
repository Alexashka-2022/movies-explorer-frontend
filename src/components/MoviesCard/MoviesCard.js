import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import cardPath from '../../images/card__cover.png'

function MoviesCard() {
    const { pathname } = useLocation();
    const [isSavedFilm, setSavedFilm] = React.useState(false);
    return (
        <li className="card">
            <div className="card__description">
                <h2 className="card__title">В погоне за Бенкси</h2>
                <p className="card__duration">27 минут</p>
            </div>
            <a href="https://www.youtube.com/watch?v=K521T9HmGyM&ab" className="card__link" target="_blank" rel="noreferrer">
                <img className="card__cover" src={cardPath} alt="обложка фильма" />
            </a>
            {pathname === "/movies" ? (
                <button type="button" className={`card__add-button ${isSavedFilm && "card__save-button"}`}>{`${isSavedFilm ? "" : "Сохранить"}`}</button>
            ) : (<button type='button' className='card__add-button card__delete-button'></button>
            )}
        </li>
    );
}

export default MoviesCard;