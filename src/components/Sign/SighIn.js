import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/user";
import "./sign.css";
import { ErrorMsg } from "./ErrorMsg";

export function SighIn() {
  const dispatch = useDispatch();
  const [login, setLogin] = React.useState("Логин");
  const [password, setPassword] = React.useState("Пароль");
  const [isCorrectPassword, setIsCorrectPassword] = React.useState(true);
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3001/users?login=${login}`);
    const user = await response.json();

    if (user.length > 0 && password === user[0].password) {
      setIsCorrectPassword(true);
      dispatch(setUser(user[0]));
      history.push("/");
    } else {
      setIsCorrectPassword(false);
    }
  };

  return (
    <div className="sign-forms">
      <h1>Привет!</h1>
      <h1>Здесь вы можете построить LR(1)-автомат</h1>

      <form>
        <div>
          <input
            name="title"
            type="text"
            placeholder={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            name="description"
            type="password"
            placeholder={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <ErrorMsg
          isCorrect={isCorrectPassword}
          text="Неверные логин или пароль"
          cssName="incorrect-login"
        />

        <button type="SignIn" className="simple-button" onClick={handleClick}>
          Вход
        </button>
      </form>
    </div>
  );
}
