import './AuthForm.css';
import logoPath from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';

function AuthForm(props) {
    return (
        <div className="auth-form">
            <Link className="auth-form__logo-link" to='/'>
                <img className="auth-form__logo" src={logoPath} alt="Логотип" />
            </Link>
            <h1 className="auth-form__title">{props.title}</h1>
            <form className="auth-form__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className={`auth-form__submit-btn auth-form__submit-btn_${props.name} ${!props.isValid && "auth-form__submit-btn_disabled"}`} disabled={!props.isValid}>
                    {props.buttonText}
                </button>
            </form>
        </div>
    );
}

export default AuthForm;