import { Link } from "react-router-dom";
import "./header.css";
import { UserInfo } from "./UserInfo";

export function Header() {
  return (
    <header>
      <div className="menu">
        <Link to="/">Сохраненные автоматы</Link>
        <Link to="/create_automata">Создать автомат</Link>
        <Link to="/about">О сайте</Link>

        <div className="user-info">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
