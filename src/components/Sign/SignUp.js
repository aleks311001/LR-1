import React from "react";
import "./sign.css";
import { useAuth } from "./useAuth";
import { HOST_ADDR } from "../../constants/constants";

export function SignUp() {
  const [email, setEmail] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { onAuth } = useAuth(setError);

  React.useEffect(() => {
    if (error) {
      setError("");
    }
  }, [login, email, password]);

  const handleClick = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Введите email");
      return;
    }

    if (!login) {
      setError("Введите логин");
      return;
    }

    if (!password) {
      setError("Введите пароль");
      return;
    }

    const user = { username: login, password, email };

    await fetch(`http://${HOST_ADDR}/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(user),
    });

    await onAuth(login, password);
  };

  return (
    <div className="sign-forms">
      <h1>Привет!</h1>
      <h1>Здесь вы можете построить LR(1)-автомат</h1>

      <form>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Логин"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div className="incorrect-login">{error}</div>

        <button type="submit" className="simple-button" onClick={handleClick}>
          Регистрация
        </button>
      </form>
    </div>
  );
}
