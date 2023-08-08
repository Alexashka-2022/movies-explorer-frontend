import React from 'react';
import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filteredByName, filteredByDuration } from '../../utils/utils';

function SavedMovies(props) {
    const { pathname } = useLocation();
    const [movies, setMovies] = React.useState([]);
    const [isCheckboxEnable, setCheckBoxEnable] = React.useState(false);
    const [isSearchError, setIsSearchError] = React.useState("");
    const savedMovies = props.savedMovies;

    React.useEffect(() => {
        setMovies(savedMovies);
    }, [pathname, savedMovies])

    function handleSearch(value) {

        if (value) {
            const filteredMovies = filteredByName(savedMovies, value);
            localStorage.setItem("foundSavedMovies", JSON.stringify(filteredMovies));

            if (filteredMovies.length !== 0) {
                setIsSearchError("");
                setMovies(filteredMovies);
            } else {
                setIsSearchError("Ничего не удалось найти");
                setMovies([]);
            }

            if (isCheckboxEnable) {
                const filteredShortMovies = filteredByDuration(filteredMovies);
                localStorage.setItem("foundSavedShortMovies", JSON.stringify(filteredShortMovies));
            }

            isCheckboxEnable ? setMovies(JSON.parse(localStorage.getItem("foundSavedShortMovies"))) : setMovies(JSON.parse(localStorage.getItem("foundSavedMovies")));
        } else {
            isCheckboxEnable ? setMovies(filteredByDuration(savedMovies)) : setMovies(savedMovies);
        }
    }

    function toggleCheckbox() {
        setCheckBoxEnable(!isCheckboxEnable);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <main className='saved-movies'>
                <SearchForm
                    handleSearch={handleSearch}
                    isCheckboxEnable={isCheckboxEnable}
                    toggleCheckbox={toggleCheckbox}
                />
                {!isSearchError && (
                    <MoviesCardList
                        cards={movies}
                        savedMovies={savedMovies}
                        onDeleteMovie={props.onDeleteMovie}
                    />
                )}
                {isSearchError && <p className="movies__empty-search">{isSearchError}</p>}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;