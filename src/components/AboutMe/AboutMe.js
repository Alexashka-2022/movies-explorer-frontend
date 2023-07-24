import './AboutMe.css';
import photoPath from '../../images/about-me__photo.jpg';

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__header">Студент</h2>
            <div className="about-me__profile">
                <div className="about-me__description">
                    <h3 className="about-me__name">Александр</h3>
                    <p className="about-me__job">Веб-разработчик, 38 лет</p>
                    <p className="about-me__info">Живу в городе Луганск. Учусь на курсах по веб-&nbsp;разработке.
                        Люблю слушать музыку, узнавать что-то новое. В свободное время люблю гулять и рисовать.</p>
                    <a className="about-me__link" href="https://github.com/Alexashka-2022" target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <img className="about-me__photo" src={photoPath} alt="Фото профиля" />
            </div>

        </section>
    );
}

export default AboutMe;