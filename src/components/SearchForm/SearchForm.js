import './SearchForm.css';

function SearchForm() {
    return (
        <section className="search-form">
            <div className="search-form__input-container">
                <input className="search-form__input" placeholder="Фильм" required />
                <button className="search-form__button" type="submit" />
            </div>
            <div className="search-form__checkbox-container">
                <input className="search-form__checkbox" type="checkbox" id='search-form__checkbox' value="yes" />
                <label className="search-form__label" htmlFor="search-form__checkbox">Короткометражки</label>
            </div>
        </section>
    );
}

export default SearchForm;