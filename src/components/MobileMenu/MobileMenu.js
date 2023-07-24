import './MobileMenu.css';
import { NavLink, Link } from 'react-router-dom';
import accountPath from '../../images/header__user-icon.svg';

function MobileMenu(props) {
    return (
        <div className={`menu ${props.isMobileMenuOpen ? "menu_opened" : ""}`}>
            <div className="menu__content">
                <button className="menu__close-button" type="button" onClick={props.closeMobileMenu} />
                <nav className="menu__navigation">
                    <NavLink to='/' className={({ isActive }) => `menu__navigation-link ${isActive ? "menu__navigation-link_active" : ""}`}>
                        Главная
                    </NavLink>
                    <NavLink to='/movies' className={({ isActive }) => `menu__navigation-link ${isActive ? "menu__navigation-link_active" : ""}`}>
                        Фильмы
                    </NavLink>
                    <NavLink to='/saved-movies' className={({ isActive }) => `menu__navigation-link ${isActive ? "menu__navigation-link_active" : ""}`}>
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                <Link to='/profile' className="menu__profile-link">
                    Аккаунт
                    <img className="menu__user-icon"
                        src={accountPath}
                        alt="Иконка аккаунта" />
                </Link>
            </div>
        </div>
    );
}

export default MobileMenu;