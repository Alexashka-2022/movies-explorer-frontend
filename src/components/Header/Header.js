import React from 'react';
import './Header.css';
import logoPath from '../../images/header__logo.svg';
import accountPath from '../../images/header__user-icon.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header(props) {
    const { pathname } = useLocation();
    const [isDesktopResolution, setDesktopResolution] = React.useState(window.innerWidth > 800);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('resize', updateResolutionInfo);

        return () => {
            window.removeEventListener('resize', updateResolutionInfo);
        }
    });

    function updateResolutionInfo() {
        setDesktopResolution(window.innerWidth > 800);
    }

    function openMobileMenu() {
        setIsMobileMenuOpen(true);
    }
    function closeMobileMenu() {
        setIsMobileMenuOpen(false);
    }
    return (
        <>
            {pathname === '/' && (
                //клиент не авторизован
                !props.loggedIn  //клиент не авторизован
                    ? (<header className="header header-landing">
                        <Link to='/' className="header__logo-link">
                            <img className="header__logo" src={logoPath} alt='Логотип' />
                        </Link >
                        <div className="header__auth-links">
                            <Link to='/signup' className="header__register-link">
                                Регистрация
                            </Link>
                            <Link to='/signin' className="header__login-link">
                                Войти
                            </Link>
                        </div>
                    </header >)
                    : (
                        <header className="header header-logged-in">
                            <Link to='/' className="header__logo-link">
                                <img className="header__logo" src={logoPath} alt='Логотип' />
                            </Link >
                            {(() => {
                                if (isDesktopResolution) {
                                    return (
                                        <>
                                            <Navigation />
                                            <Link to='/profile' className="header__profile-link">
                                                Аккаунт
                                                <img className="header__user-icon"
                                                    src={accountPath}
                                                    alt="Иконка аккаунта" />
                                            </Link>
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            {isMobileMenuOpen && <MobileMenu isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />}
                                            <button className="header__menu-burger" type="button" onClick={openMobileMenu} />
                                        </>
                                    );
                                }
                            })()}
                        </header >))
            }
            {(pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile") &&
                (
                    <header className="header header-logged-in">
                        <Link to='/' className="header__logo-link">
                            <img className="header__logo" src={logoPath} alt='Логотип' />
                        </Link >
                        {(() => {
                            if (isDesktopResolution) {
                                return (
                                    <>
                                        <Navigation />
                                        <Link to='/profile' className="header__profile-link">
                                            Аккаунт
                                            <img className="header__user-icon"
                                                src={accountPath}
                                                alt="Иконка аккаунта" />
                                        </Link>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        {isMobileMenuOpen && <MobileMenu isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />}
                                        <button className="header__menu-burger" type="button" onClick={openMobileMenu} />
                                    </>
                                );
                            }
                        })()}
                    </header >)
            }
        </>
    );
}

export default Header;