import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/user";
import "./sign.css";
import { ErrorMsg } from "./ErrorMsg";

export function SignUp() {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("Имя");
  const [mail, setMail] = React.useState("E-mail");
  const [login, setLogin] = React.useState("Логин");
  const [password, setPassword] = React.useState("Пароль");
  const [isCorrectLogin, setIsCorrectLogin] = React.useState(true);
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();
    const updateUser = { name, mail, login, password };

    const response_login = await fetch(
      `http://localhost:3001/users?login=${login}`
    );
    const data = await response_login.json();
    if (data.length > 0) {
      setIsCorrectLogin(false);
      return;
    }

    setIsCorrectLogin(true);

    const response = await fetch("http://localhost:3001/users", {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(updateUser),
      method: "POST",
    });
    const user = await response.json();

    dispatch(setUser(user));
    history.push("/");
  };

  return (
    <div className="sign-forms">
      <h1>Привет!</h1>
      <h1>Здесь вы можете построить LR(1)-автомат</h1>

      <form>
        <div>
          <input
            name="name"
            type="text"
            placeholder={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            name="mail"
            type="email"
            placeholder={mail}
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
        </div>

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
          isCorrect={isCorrectLogin}
          text="Такой логин уже существует"
          cssName="incorrect-login"
        />

        <button type="SignIn" className="simple-button" onClick={handleClick}>
          Регистрация
        </button>
      </form>
    </div>
  );
}
