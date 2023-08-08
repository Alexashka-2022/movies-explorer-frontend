import React from "react";
import './InfoTooltip.css';
import imageStatusSuccess from '../../images/infoTooltip-success.svg';
import imageStatusFail from '../../images/infoTooltip-fail.svg';

function InfoTooltip(props) {
    const messageStatusSuccess = "Операция выполнена успешно!";
    const messageStatusFail = "Что-то пошло не так! Попробуйте ещё раз.";

    React.useEffect(() => {
        if (props.isOpen) {
            document.addEventListener("keydown", props.handleEscClose);
        }
        return () => document.removeEventListener("keydown", props.handleEscClose);
    }, [props.isOpen, props.handleEscClose]);

    function handleCloseByOverlayClick(event) {
        if (event.target === event.currentTarget) {
            props.onClose();
        }
    }
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} onClick={handleCloseByOverlayClick}>
            <div className="tooltip popup__container">
                <img className="tooltip__image"
                    src={props.isSubmitSuccess ? imageStatusSuccess : imageStatusFail}
                    alt={props.isSubmitSuccess ? messageStatusSuccess : messageStatusFail}
                />
                <h2 className='tooltip__text'>{props.submitStatus}</h2>
                <button
                    className='button popup__close-icon'
                    type='button'
                    onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;