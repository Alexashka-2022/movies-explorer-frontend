import './Login.css';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <main className="login">
            <AuthForm
                title="Рады видеть!"
                buttonText="Войти"
                name="login">
                <label htmlFor='login__input-email' className='login__label'>E-mail</label>
                <input
                    type="email"
                    id="login__input-email"
                    defaultValue="pochta@yandex.ru"
                    name="email"
                    className="login__input"
                    placeholder="e-mail"
                    required
                    minLength="5"
                    maxLength="30"
                />
                <span className="login__error">Что-то пошло не так...</span>
                <label htmlFor='login__input-password' className='login__label'>Пароль</label>
                <input
                    type="password"
                    id="login__input-password"
                    defaultValue="••••••••••••••"
                    name="password"
                    className="login__input"
                    placeholder="Пароль"
                    required
                    minLength="6"
                    maxLength="30"
                />
                <span className="login__error login__error_visible">Что-то пошло не так...</span>
            </AuthForm>
            <p className="login__footer">
                Ещё не зарегистрированы?
                <Link className="login__footer-link" to="/signup">Регистрация</Link>
            </p>
        </main>
    );
}

export default Login;