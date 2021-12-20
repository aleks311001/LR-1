import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { exitUser } from "../../actions/user";

export function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user) || {};

  return (
    <header>
      <div className="menu">
        <Link to="/">Сохраненные автоматы</Link>
        <Link to="/create_automata">Создать автомат</Link>
        <Link to="/about">О сайте</Link>

        <div className="user-info">
          {user.id ? (
            <>
              <p>{user.username}</p>
              <Link
                to="/sign_out"
                onClick={() => {
                  dispatch(exitUser());
                  // window.localStorage.clear();
                }}
              >
                Выход
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign_in">Вход</Link>
              <Link to="/sigh_up">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
