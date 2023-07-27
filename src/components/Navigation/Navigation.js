import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
    return (
        <nav className="navigation">
            <NavLink to='/movies' className={({ isActive }) => `navigation__header-link ${isActive ? "navigation__header-link_active" : ""}`}>
                Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className={({ isActive }) => `navigation__header-link ${isActive ? "navigation__header-link_active" : ""}`}>
                Сохранённые фильмы
            </NavLink>
        </nav>
    );
}

export default Navigation;