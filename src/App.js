import { useRef, useState } from "react";

const regExpEmail = /^[a-zA-Z0-9_\.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$/;
const regExpPass =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/;

export const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(null);
  const submitButtonRef = useRef(null);

  const isAllDataValid = (email, password, confirmedPassword) => {
    return (
      regExpEmail.test(email) &&
      regExpPass.test(password) &&
      password == confirmedPassword
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password, confirmedPassword });
  };

  const onEmailChange = ({ target }) => {
    let newErrorEmail = null;

    setEmail(target.value);

    if (!regExpEmail.test(target.value)) {
      newErrorEmail = "Неверный email.";
    }

    setEmailError(newErrorEmail);

    if (isAllDataValid(target.value, password, confirmedPassword)) {
      submitButtonRef.current.disabled = false;
      submitButtonRef.current.focus();
    }
  };

  const onPasswordChange = ({ target }) => {
    setPassword(target.value);

    let newErrorPassword = null;

    if (!regExpPass.test(target.value)) {
      newErrorPassword =
        "Неверный пароль. Пароль должен содержать не менее 6 символов - из них минимум 1 цифра, 1 латинская буква в верхнем регистре и 1 спецсимвол.";
    }

    setPasswordError(newErrorPassword);

    if (isAllDataValid(email, target.value, confirmedPassword)) {
      submitButtonRef.current.disabled = false;
      submitButtonRef.current.focus();
    }
  };

  const onConfirmedPasswordChange = ({ target }) => {
    setConfirmedPassword(target.value);

    let confirmedPasswordError = null;

    if (target.value !== password) {
      confirmedPasswordError = "Пароли должны совпадать.";
    }

    setConfirmedPasswordError(confirmedPasswordError);

    if (isAllDataValid(email, password, target.value)) {
      submitButtonRef.current.disabled = false;
      submitButtonRef.current.focus();
    }
  };

  return (
    <div>
      {emailError && <div>{emailError}</div>}
      {passwordError && <div>{passwordError}</div>}
      {confirmedPasswordError && <div>{confirmedPasswordError}</div>}
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Почта"
          value={email}
          onChange={({ target }) => onEmailChange({ target })}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={({ target }) => onPasswordChange({ target })}
          autoComplete="off"
        />
        <input
          name="confirmedPassword"
          type="password"
          placeholder="Повтор пароля"
          value={confirmedPassword}
          onChange={({ target }) => onConfirmedPasswordChange({ target })}
          autoComplete="off"
        />
        <button
          type="submit"
          ref={submitButtonRef}
          disabled={!isAllDataValid(email, password, confirmedPassword)}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default App;
