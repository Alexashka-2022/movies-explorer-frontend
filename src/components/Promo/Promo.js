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
            <a className="promo__link-more" href="#about-project">
                <p className="promo__link-text">Узнать больше</p>
            </a>
        </section>
    );
}

export default Promo;