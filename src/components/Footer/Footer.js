import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__bottom-panel">
                <p className="footer__copyright">&copy; {currentYear}</p>
                <ul className="footer__links">
                    <li className="footer__item"><a className="footer__link"
                        href='https://practicum.yandex.ru/'
                        target='_blank'
                        rel='noopener noreferrer'>Яндекс.Практикум</a>
                    </li>
                    <li className="footer__item"><a className="footer__link"
                        href='https://github.com/Alexashka-2022'
                        target='_blank'
                        rel='noopener noreferrer'>Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;