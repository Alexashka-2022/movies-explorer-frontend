import { useState, useCallback } from "react";
import * as EmailValidator from 'email-validator';

export default function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setValid] = useState(false);

    const handleChange = (event) => {
        const validityState = event.target.validity;
        const { name, value } = event.target;

        if (name === "email") {
            if (validityState.valueMissing) {
                event.target.setCustomValidity("Не заполнено поле");
            } else if (!EmailValidator.validate(value)) {
                event.target.setCustomValidity("Необходимо ввести корректный e-mail");
            } else {
                event.target.setCustomValidity("");
            }
        }

        if (name === "name") {
            if (validityState.valueMissing) {
                event.target.setCustomValidity("Не заполнено поле");
            } else if (validityState.toShort) {
                event.target.setCustomValidity("Имя должно быть не менее 2 знаков");
            } else if (validityState.tooLong) {
                event.target.setCustomValidity("Имя должно быть меньше 30 символов");
            } else if (validityState.patternMismatch) {
                event.target.setCustomValidity("Имя должно содержать только латиницу, кириллицу, пробел или дефис");
            } else {
                event.target.setCustomValidity("");
            }
        }

        if (name === "password") {
            if (validityState.valueMissing) {
                event.target.setCustomValidity("Не заполнено поле");
            } else if (validityState.toShort) {
                event.target.setCustomValidity("Пароль должен быть не менее 6 символов");
            } else {
                event.target.setCustomValidity("");
            }
        }

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: event.target.validationMessage });
        setValid(event.target.closest("form").checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setValid(newIsValid);
        },
        [setValues, setErrors, setValid]
    );

    return {
        values,
        setValues,
        handleChange,
        errors,
        setErrors,
        isValid,
        setValid,
        resetForm
    }
}