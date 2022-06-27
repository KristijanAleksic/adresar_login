import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import useInput from "../../hooks/userInput";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validEmailFormat = /^\S+@\S+\.\S{2}/;

  //email
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInputs: resetEmailInput,
  } = useInput((value) => value.match(validEmailFormat));

  //password
  let specialChars = /[!#$+-]/;
  const hasNumber = /\d/;
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInputs: resetPasswordInput,
  } = useInput((value) =>{
    if(value.trim().length > 5){
      if(hasNumber.test(value)){
        if(specialChars.test(value)){
          return true;
        }
      }
    }
  });
    
    /* console.log('trimmed value', value.trim().length) &&
      (value.trim().length > 5) &&
      console.log('hasNumber test: ', hasNumber.test(value))&&
      hasNumber.test(value) &&
      console.log('has specialChars test: ', specialChars.test(value))&&
      specialChars.test(value)); */

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    //dodat auth

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa2pV8Ct34q84wK_2DrS2ugSE8olf5I8U";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDa2pV8Ct34q84wK_2DrS2ugSE8olf5I8U";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {   //proslijeduje firebase error
            //   errorMessage = data.error.message;
            // }
            let errorMessage = "";
            if (data.error.message === "INVALID_PASSWORD") {
              errorMessage = "Invalid password";
            } else if (data.error.message === "EMAIL_EXISTS") {
              errorMessage = "Email already exists";
            } else if (data.error.message === "INVALID_EMAIL") {
              errorMessage = "Email is invalid!";
            } else {
              errorMessage = "This e-mail does not exist";
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/adresar");
      })
      .catch((err) => {
        alert(err.message);
      });
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            //ref={emailInputRef}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className={classes["error-msg"]}>
              Please enter a valid email address
            </p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            // ref={passwordInputRef}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p>
              Password must be at least 6 characters long and contain at least
              one number and one special character
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Loading..</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
