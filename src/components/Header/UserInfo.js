import { Link } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { exitUser } from "../../actions/user";

export function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <>
        <Link to="/sign_in">Вход</Link>
        <Link to="/sigh_up">Регистрация</Link>
      </>
    );
  } else {
    return (
      <>
        <p>{user.name}</p>
        <Link to="/sign_in" onClick={() => dispatch(exitUser())}>
          Выход
        </Link>
      </>
    );
  }
}
