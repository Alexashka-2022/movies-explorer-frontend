import React from "react";
import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    const comeBack = () => {
        navigate(-1);
    }
    return (
        <main className="error-page">
            <h1 className="error-page__title">404</h1>
            <p className="error-page__subtitle">Страница не найдена</p>
            <button className="error-page__button" type="button" onClick={comeBack}>Назад</button>
        </main>
    );
}

export default PageNotFound;