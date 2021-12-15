import React from "react";
import "./sign.css";
import { useAuth } from "./useAuth";

export function SighIn() {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const { onAuth } = useAuth(setError);

  React.useEffect(() => {
    if (error) {
      setError("");
    }
  }, [login, password]);

  const handleClick = async (event) => {
    event.preventDefault();

    if (!login) {
      setError("Введите логин");
      return;
    }

    if (!password) {
      setError("Введите пароль");
      return;
    }

    try {
      await onAuth(login, password);
    } catch (err) {
      //
    }
  };

  return (
    <div className="sign-forms">
      <h1>Привет!</h1>
      <h1>Здесь вы можете построить LR(1)-автомат</h1>

      <form>
        <div>
          <input
            type="text"
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
          Вход
        </button>
      </form>
    </div>
  );
}
