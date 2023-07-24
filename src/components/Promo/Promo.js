import React from "react";
import './Promo.css';
import promoLogo from '../../images/promo__logo.svg'

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <h2 className="promo__subtitle">
                Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </h2>
            <img className="promo__logo" src={promoLogo} alt="логотип проекта" />
            <button className="promo__button-more" type="button">
                <a href="#about-project" className="promo__link-more">Узнать больше</a>
            </button>
        </section>
    );
}

export default Promo;