import './Register.css';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Register() {
    return (
        <main className="registration">
            <AuthForm
                title="Добро пожаловать!"
                buttonText="Зарегистрироваться"
                name="register">
                <label htmlFor="register__input-name" className="registration__label">Имя</label>
                <input
                    type="text"
                    id="register__input-name"
                    defaultValue="Виталий"
                    name="name"
                    className="registration__input"
                    placeholder="Имя"
                    required
                />
                <span className="registration__error">Что-то пошло не так...</span>
                <label htmlFor="register__input-email" className='registration__label'>E-mail</label>
                <input
                    type="email"
                    id="register__input-email"
                    defaultValue="pochta@yandex.ru"
                    name="email"
                    className="registration__input"
                    placeholder="e-mail"
                    required
                    minLength="5"
                    maxLength="30"
                />
                <span className="registration__error">Что-то пошло не так...</span>
                <label htmlFor="register__input-password" className='registration__label'>Пароль</label>
                <input
                    type="password"
                    id="register__input-password"
                    defaultValue="••••••••••••••"
                    name="password"
                    className="registration__input"
                    placeholder="Пароль"
                    required
                    minLength="6"
                    maxLength="30"
                />
                <span className="registration__error registration__error_visible">Что-то пошло не так...</span>
            </AuthForm>
            <p className="registration__footer">
                Уже зарегистрированы?
                <Link className="registration__footer-link" to="/signin">Войти</Link>
            </p>
        </main>
    );
}

export default Register;