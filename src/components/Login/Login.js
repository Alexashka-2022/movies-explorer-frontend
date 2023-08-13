import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login(props) {
    const { values, handleChange, errors, isValid } = useFormWithValidation({});

    function handleSubmit(event) {
        event.preventDefault();
        props.handleLogin(values);
    }
    return (props.loggedIn ? (
        <Navigate to="/" replace />
    ) : (<main className="login">
        <AuthForm
            title="Рады видеть!"
            buttonText="Войти"
            name="login"
            onSubmit={handleSubmit}
            isValid={isValid}>
            <label htmlFor='login__input-email' className='login__label'>E-mail</label>
            <input
                type="email"
                id="login__input-email"
                name="email"
                className="login__input"
                value={values.email || ""}
                onChange={handleChange}
                placeholder="e-mail"
                required
            />
            <span className={`login__error ${errors.email ? "login__error_visible" : ""}`}>{errors.email}</span>
            <label htmlFor='login__input-password' className='login__label'>Пароль</label>
            <input
                type="password"
                id="login__input-password"
                name="password"
                className="login__input"
                value={values.password || ""}
                onChange={handleChange}
                placeholder="Пароль"
                required
                minLength="6"
                maxLength="30"
            />
            <span className={`login__error ${errors.password ? "login__error_visible" : ""}`}>{errors.password}</span>
        </AuthForm>
        <p className="login__footer">
            Ещё не зарегистрированы?
            <Link className="login__footer-link" to="/signup">Регистрация</Link>
        </p>
    </main>)
    );
}

export default Login;