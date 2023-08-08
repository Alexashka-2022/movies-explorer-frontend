import React from 'react';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ searchValue, handleSearch, isCheckboxEnable, toggleCheckbox }) {
    const { values, handleChange, setValues } = useFormWithValidation({});
    const [isInputError, setIsInputError] = React.useState(false);

    React.useEffect(() => {
        setValues({ searchValue: searchValue });
    }, [searchValue, setValues]);

    function handleFormSubmit(event) {
        event.preventDefault();
        handleSearch(values.searchValue);
        if (values.searchValue === "") {
            setIsInputError(true);
        } else {
            setIsInputError(false);
        }
    }

    return (
        <section className="search-form">
            <form className="search-form__form" onSubmit={handleFormSubmit} noValidate>
                <div className="search-form__input-container" >
                    <input className="search-form__input" name="searchValue" placeholder="Фильм" value={values.searchValue || ""} onChange={handleChange} required />
                    <button className="search-form__button" type="submit" />
                </div>
                <span className={`search-form__input-error ${isInputError ? "search-form__input-error_visible" : ""}`}>Введите ключевое слово для поиска</span>
                <div className="search-form__checkbox-container">
                    <input className="search-form__checkbox" type="checkbox" id='search-form__checkbox' value="yes" checked={isCheckboxEnable} onChange={toggleCheckbox} />
                    <label className="search-form__label" htmlFor="search-form__checkbox">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;