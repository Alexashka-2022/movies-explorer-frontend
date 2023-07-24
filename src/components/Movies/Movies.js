import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList cards={props.cards} />
            </main>
            <Footer />
        </>
    );
}

export default Movies;