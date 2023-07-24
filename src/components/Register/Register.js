import './Register.css';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
    return (
        <section className="registration">
            <AuthForm
                title="Добро пожаловать!"
                buttonText="Зарегистрироваться"
                name="register">
                <label htmlFor="name" className="registration__label">Имя</label>
                <input
                    type="text"
                    defaultValue="Виталий"
                    name="name"
                    className="registration__input"
                    placeholder="Имя"
                    required
                />
                <span className="registration__error">Что-то пошло не так...</span>
                <label htmlFor='email' className='registration__label'>E-mail</label>
                <input
                    type="email"
                    defaultValue="pochta@yandex.ru"
                    name="email"
                    className="registration__input"
                    placeholder="e-mail"
                    required
                />
                <span className="registration__error">Что-то пошло не так...</span>
                <label htmlFor='password' className='registration__label'>Пароль</label>
                <input
                    type="password"
                    defaultValue="••••••••••••••"
                    name="password"
                    className="registration__input"
                    placeholder="Пароль"
                    required
                />
                <span className="registration__error registration__error_visible">Что-то пошло не так...</span>
            </AuthForm>
            <p className="registration__footer">
                Уже зарегистрированы?
                <Link className="registration__footer-link" to="/signin">Войти</Link>
            </p>
        </section>
    );
}

export default Register;