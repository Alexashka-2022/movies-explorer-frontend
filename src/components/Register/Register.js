import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { regExp } from '../../utils/constants';

function Register(props) {
    const { values, handleChange, errors, isValid } = useFormWithValidation({});

    function handleSubmit(event) {
        event.preventDefault();
        props.handleRegistration(values);
    }

    return (props.loggedIn ? (
        <Navigate to="/" replace />
    ) : (<main className="registration">
        <AuthForm
            title="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            name="register"
            onSubmit={handleSubmit}
            isValid={isValid}>
            <label htmlFor="register__input-name" className="registration__label">Имя</label>
            <input
                type="text"
                id="register__input-name"
                name="name"
                className="registration__input"
                value={values.name || ""}
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                pattern={regExp}
                onChange={handleChange}
                required
            />
            <span className={`registration__error ${errors.name ? "registration__error_visible" : ""}`}>{errors.name}</span>
            <label htmlFor="register__input-email" className='registration__label'>E-mail</label>
            <input
                type="email"
                id="register__input-email"
                name="email"
                className="registration__input"
                value={values.email || ""}
                placeholder="e-mail"
                onChange={handleChange}
                required
            />
            <span className={`registration__error ${errors.email ? "registration__error_visible" : ""}`}>{errors.email}</span>
            <label htmlFor="register__input-password" className='registration__label'>Пароль</label>
            <input
                type="password"
                id="register__input-password"
                name="password"
                className="registration__input"
                value={values.password || ""}
                placeholder="Пароль"
                onChange={handleChange}
                required
                minLength="6"
                maxLength="30"
            />
            <span className={`registration__error ${errors.password ? "registration__error_visible" : ""}`}>{errors.password}</span>
        </AuthForm>
        <p className="registration__footer">
            Уже зарегистрированы?
            <Link className="registration__footer-link" to="/signin">Войти</Link>
        </p>
    </main>)
    );
}

export default Register;