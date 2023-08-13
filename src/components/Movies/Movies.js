import React from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import { filteredByName, filteredByDuration } from '../../utils/utils';
import {
    resolutionMax,
    resolutionMid,
    renderFilmsMax,
    renderFilmsMid,
    renderFilmsMin,
    addMoreMax,
    addMoreMid,
    addMoreMin,
} from '../../utils/constants';

function Movies(props) {
    const { pathname } = useLocation();
    const [movies, setMovies] = React.useState([]);
    const [renderedMovies, setrenderedMovies] = React.useState(movies);
    const [searchValue, setSearchValue] = React.useState("");
    const [isCheckboxEnable, setCheckBoxEnable] = React.useState(false);
    const [isSearchError, setIsSearchError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShowMoreButton, setIsShowMoreButton] = React.useState(false);
    const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        if (pathname === "/movies") {
            if (localStorage.getItem("search")) {
                setSearchValue(localStorage.getItem("search"));
            }

            if (localStorage.getItem("isCheckboxEnable") === "enable") {
                setCheckBoxEnable(true);
                setMovies(JSON.parse(localStorage.getItem("foundShortMovies")));
            }

            if (localStorage.getItem("isCheckboxEnable") === "disable") {
                setCheckBoxEnable(false);
                setMovies(JSON.parse(localStorage.getItem("foundMovies")));
            }
        }
    }, [pathname])

    function updateMovies(allMovies, value) {

        if (value) {
            setSearchValue(value);
            localStorage.setItem("search", value);

            const filteredMovies = filteredByName(allMovies, value);
            localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));

            if (filteredMovies.length !== 0) {
                setIsSearchError("");
                setMovies(filteredMovies);
            } else {
                setIsSearchError("Ничего не удалось найти");
                setMovies([]);
            }

            // если чекбокс включен 
            if (isCheckboxEnable) {
                localStorage.setItem("isCheckboxEnable", "enable");
                const filteredShortMovies = filteredByDuration(filteredMovies, value);
                localStorage.setItem("foundShortMovies", JSON.stringify(filteredShortMovies));
            } else {
                localStorage.setItem("isCheckboxEnable", "disable");
            }

            isCheckboxEnable ? setMovies(JSON.parse(localStorage.getItem("foundShortMovies"))) : setMovies(JSON.parse(localStorage.getItem("foundMovies")));
        }

    }

    function handleSearch(value) {
        const allMovies = JSON.parse(localStorage.getItem("allMovies") || '[]');
        if (allMovies.length === 0) {
            setIsLoading(true);
            moviesApi.getMovies()
                .then((movies) => {
                    localStorage.setItem("allMovies", JSON.stringify(movies));
                    updateMovies(movies, value)
                }).catch((err) => {
                    console.log(err);
                    setIsSearchError(
                        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
                    );
                }).finally(() => {
                    setIsLoading(false);
                })
        } else {
            updateMovies(allMovies, value)
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', updateWidthInfo);

        return () => {
            window.removeEventListener('resize', updateWidthInfo);
        }
    });

    function updateWidthInfo() {
        setTimeout(() => {
            setCurrentWidth(window.innerWidth);
        }, 300);
    }


    function toggleCheckbox() {
        setCheckBoxEnable(!isCheckboxEnable);
    }

    React.useEffect(() => {
        if (renderedMovies.length < movies.length) {
            setIsShowMoreButton(true);
        } else {
            setIsShowMoreButton(false);
        }
    }, [renderedMovies.length, movies.length]);

    /*Расчитываем количество выводимых на страницу фильмов*/
    React.useEffect(() => {
        if (currentWidth >= resolutionMax) {
            setrenderedMovies(movies.slice(0, renderFilmsMax));
        } else if (
            currentWidth >= resolutionMid &&
            currentWidth < resolutionMax
        ) {
            setrenderedMovies(movies.slice(0, renderFilmsMid));
        } else {

            setrenderedMovies(movies.slice(0, renderFilmsMin));
        }
    }, [currentWidth, movies]);

    /*Обработчик кнопки "ЕЩЕ"*/
    function handleShowMoreButtonClick() {
        if (
            renderedMovies.length < movies.length &&
            currentWidth >= resolutionMax
        ) {
            setrenderedMovies(movies.slice(0, renderedMovies.length + addMoreMax));
        } else if (
            (renderedMovies.length < movies.length) &&
            (currentWidth >= resolutionMid && currentWidth < resolutionMax)
        ) {
            setrenderedMovies(movies.slice(0, renderedMovies.length + addMoreMid));
        } else {
            setrenderedMovies(movies.slice(0, renderedMovies.length + addMoreMin));
        }

    }

    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <main className="movies">
                <SearchForm
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    isCheckboxEnable={isCheckboxEnable}
                    toggleCheckbox={toggleCheckbox}
                />
                {isLoading && <Preloader />}
                {!isSearchError && (
                    <MoviesCardList
                        cards={renderedMovies}
                        onShowMoreButtonClick={handleShowMoreButtonClick}
                        isShowMoreButton={isShowMoreButton}
                        onSaveMovie={props.onSaveMovie}
                        onDeleteMovie={props.onDeleteMovie}
                    />)}
                {isSearchError && <p className="movies__empty-search">{isSearchError}</p>}
            </main>
            <Footer />
        </>
    );
}

export default Movies;