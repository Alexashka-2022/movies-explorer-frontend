import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { regExp } from '../../utils/constants';

function Profile(props) {
    const { values, setValues, handleChange, isValid, setValid, resetForm } = useFormWithValidation({ name: "", email: "" });
    const [isEditProfile, setEditProfile] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setValues({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [currentUser.name, currentUser.email, setValues])


    React.useEffect(() => {
        if (
            values.name === currentUser.name &&
            values.email === currentUser.email
        ) {
            setValid(false);
        }
    });

    function handleClickEditProfile(event) {
        event.preventDefault();
        setEditProfile(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser(values);
        setEditProfile(false);
        if (!isEditProfile) {
            resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
        }
    }


    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <main className="profile">
                <h1 className="profile__header">Привет, {currentUser.name}!</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__input-container profile__name">
                        <label className="profile__input-name">Имя</label>
                        <input className="profile__input"
                            id="profile__name"
                            type="text"
                            name="name"
                            placeholder="имя"
                            required
                            pattern={regExp}
                            minLength="2"
                            maxLength="30"
                            value={values.name || ""}
                            onChange={handleChange}
                            disabled={isEditProfile ? false : true}
                        />

                    </div>
                    <div className="profile__input-container profile__email">
                        <label className="profile__input-name">E-mail</label>
                        <input className="profile__input"
                            id="profile__email"
                            type="email"
                            name="email"
                            placeholder="e-mail"
                            required
                            value={values.email || ""}
                            onChange={handleChange}
                            disabled={isEditProfile ? false : true}
                        />
                    </div>
                    <div className="profile__buttons">
                        {isEditProfile ?
                            <button className={`profile__button ${!isValid ? "profile__submit-button_disabled" : "profile__submit-button"}`} type="submit" onClick={handleSubmit} disabled={!isValid}>Сохранить</button>
                            :
                            <>
                                <button className="profile__button profile__edit-button" type="button" onClick={handleClickEditProfile}>Редактировать</button>
                                <a className="profile__button profile__logoff-button" href="/">
                                    <p className="profile__logoff-text" onClick={props.handleLogout}>Выйти из аккаунта</p>
                                </a>
                            </>
                        }
                    </div>
                </form>
            </main>
        </>
    );
}

export default Profile;