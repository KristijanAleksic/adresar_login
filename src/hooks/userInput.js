import React, { useState } from "react";

const useInput = validateInput => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const inputIsValid = validateInput(inputValue);
    const hasError = !inputIsValid && isFocused;

    const inputChangeHandler = e => {
        setInputValue(e.target.value);
    }

    const inputBlurHandler = e => {
        setIsFocused(true);
    }

    const resetInputs = () => {
        setInputValue('');
        setIsFocused(false);
    }

    return {
        value: inputValue,
        isValid: inputIsValid,
        hasError: hasError,
        inputChangeHandler,
        inputBlurHandler,
        resetInputs
    }
}

export default useInput;