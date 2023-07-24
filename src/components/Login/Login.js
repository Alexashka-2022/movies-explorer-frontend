import './Login.css';
import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
    return (
        <section className="login">
            <AuthForm
                title="Рады видеть!"
                buttonText="Войти"
                name="login">
                <label htmlFor='email' className='login__label'>E-mail</label>
                <input
                    type="email"
                    defaultValue="pochta@yandex.ru"
                    name="email"
                    className="login__input"
                    placeholder="e-mail"
                    required
                />
                <span className="login__error">Что-то пошло не так...</span>
                <label htmlFor='password' className='login__label'>Пароль</label>
                <input
                    type="password"
                    defaultValue="••••••••••••••"
                    name="password"
                    className="login__input"
                    placeholder="Пароль"
                    required
                />
                <span className="login__error login__error_visible">Что-то пошло не так...</span>
            </AuthForm>
            <p className="login__footer">
                Ещё не зарегистрированы?
                <Link className="login__footer-link" to="/signup">Регистрация</Link>
            </p>
        </section>
    );
}

export default Login;