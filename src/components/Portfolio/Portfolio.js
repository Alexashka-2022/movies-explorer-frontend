import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h4 className="portfolio__header">Портфолио</h4>
            <ul className="portfolio__links">
                <li className="portfolio__links-item">
                    <a className="portfolio__link" href="https://alexashka-2022.github.io/how-to-learn/index.html" target="_blank" rel="noreferrer">
                        <p className="portfolio__title">Статичный сайт</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__links-item">
                    <a className="portfolio__link" href="https://alexashka-2022.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">
                        <p className="portfolio__title">Адаптивный сайт</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
                <li className="portfolio__links-item">
                    <a className="portfolio__link" href="https://shmakov.students.nomoreparties.sbs/sign-in" target="_blank" rel="noreferrer">
                        <p className="portfolio__title">Одностраничное приложение</p>
                        <p className="portfolio__arrow">&#8599;</p>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;