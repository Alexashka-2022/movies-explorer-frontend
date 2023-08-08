import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const { pathname } = useLocation();
    return (
        <section className="movies-list">
            <ul className="movies-list__container">
                {props.cards.map((card) => (
                    <MoviesCard
                        card={card}
                        key={pathname === "/movies" ? card.id : card.movieId}
                        id={card._id}
                        savedMovies={props.savedMovies}
                        onSaveMovie={props.onSaveMovie}
                        onDeleteMovie={props.onDeleteMovie}
                    />
                ))}
            </ul>
            {pathname === "/movies" ?
                (props.isShowMoreButton && <button className="movies-list__add-more" type="button" onClick={props.onShowMoreButtonClick} > Ещё</button>)
                :
                (<div className="movies-list__empty-place" />)
            }
        </section >
    );
}

export default MoviesCardList;