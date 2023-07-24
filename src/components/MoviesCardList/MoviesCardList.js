import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
    return (
        <section className="movies-list">
            <ul className="movies-list__container">
                {props.cards.map((card, index) => (
                    <MoviesCard key={index} />
                ))}
            </ul>
            <button className="movies-list__add-more" type="button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;