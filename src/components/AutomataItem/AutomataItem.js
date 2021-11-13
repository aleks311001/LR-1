import "./automataItem.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function AutomataItem(props) {
  const { automataId } = props;
  const automata = useSelector(
    (state) => state.automatas.automatas[automataId]
  ) || { grammar: [] };

  return (
    <Link to={"/automata/" + automata.id}>
      <div className="automata-item">
        <p className="automata-name">{automata.name}</p>
        <p className="automata-date">{automata.date}</p>
        <p className="automata-regexp">{automata.regexp}</p>

        <div className="grammar">
          {automata.grammar.map((item, index) => (
            <p className="expr" key={index}>
              {item}
            </p>
          ))}
        </div>

        <img
          className="automata-sketch"
          src="img1.png"
          alt="Картинка не найдена, попробуйте запустить алгоритм заново"
        />
      </div>
    </Link>
  );
}
