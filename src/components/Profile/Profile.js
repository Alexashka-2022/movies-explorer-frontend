import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
    const [isEditProfile, setEditProfile] = React.useState(false);

    function handleClickEditProfile(event) {
        event.preventDefault();
        setEditProfile(true);
    }

    function handleClickSubmitChange(event) {
        event.preventDefault();
        setEditProfile(false);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} />
            <section className="profile">
                <h1 className="profile__header">Привет, Виталий!</h1>
                <form className="profile__form">
                    <div className="profile__input-container profile__name">
                        <label className="profile__input-name">Имя</label>
                        <input className="profile__input"
                            id="profile__name"
                            type="text"
                            name="name"
                            placeholder="имя"
                            required
                            minLength="2"
                            maxLength="30"
                            defaultValue="Виталий"
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
                            defaultValue="pochta@yandex.ru"
                            disabled={isEditProfile ? false : true}
                        />
                    </div>
                    <div className="profile__buttons">
                        {isEditProfile ?
                            <button className="profile__button profile__submit-button" type="submit" onClick={handleClickSubmitChange}>Сохранить</button>
                            :
                            <>
                                <button className="profile__button profile__edit-button" type="button" onClick={handleClickEditProfile}>Редактировать</button>
                                <button className="profile__button profile__logoff-button" type="button">Выйти из аккаунта</button>
                            </>
                        }
                    </div>
                </form>
            </section>
        </>
    );
}

export default Profile;