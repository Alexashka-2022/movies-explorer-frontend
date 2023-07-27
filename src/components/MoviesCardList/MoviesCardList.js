import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const { pathname } = useLocation();
    return (
        <section className="movies-list">
            <ul className="movies-list__container">
                {props.cards.map((card, index) => (
                    <MoviesCard key={index} />
                ))}
            </ul>
            {pathname === "/movies" ?
                (<button className="movies-list__add-more" type="button">Ещё</button>)
                :
                (<div className="movies-list__empty-place" />)}
        </section>
    );
}

export default MoviesCardList;