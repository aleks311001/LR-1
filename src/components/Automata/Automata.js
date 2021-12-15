import "./automata.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAutomata } from "../../actions/automatas";
import { Spinner } from "../Spinner";
import { ErrorMsg } from "../Sign/ErrorMsg";

export function Automata(props) {
  const { automataId, img, handleSave, handleDelete } = props;
  const dispatch = useDispatch();

  const automataStore = useSelector((state) => {
    if (!automataId) {
      return;
    }
    return state.automatas.automatas[automataId];
  });
  const automata = automataStore || {};
  const user = useSelector((state) => state.user.user) || {};
  const isError = useSelector((state) => state.automatas.isError);
  const isAccessDenied = useSelector((state) => state.automatas.isAccessDenied);

  const [name, setName] = React.useState(automata.name);
  const [grammar, setGrammar] = React.useState(automata.grammar);
  const [regexp, setRegexp] = React.useState(automata.regexp);

  const [isClickUnlogin, setIsClick] = React.useState(false);

  React.useEffect(() => {
    if (automataStore || !automataId) {
      return;
    }
    dispatch(fetchAutomata(user.id, automataId));
  }, []);

  // React.useEffect(() => {
  //   setName(automata.name);
  //   setGrammar(automata.grammar);
  //   setRegexp(automata.regexp);
  // }, [automata]);

  if (automataId) {
    if (isError) {
      return <h1>Произошла ошибка при загрузке автомата</h1>;
    }

    if (isAccessDenied) {
      return <h1>У вас нет доступа к этому автомату</h1>;
    }

    if (!automataStore) {
      return <Spinner />;
    }
  }

  const onClickSave = (event) => {
    event.preventDefault();

    if (!user.id) {
      setIsClick(true);
      return;
    }

    const automata = {
      name,
      grammar,
      regexp,
    };

    handleSave(automata, true);
  };

  const onClickDelete = (event) => {
    event.preventDefault();
    handleDelete(automataId);
  };

  const onClickBuild = (event) => {
    event.preventDefault();

    if (!user.id) {
      setIsClick(true);
      return;
    }

    const automata = {
      name,
      grammar,
      regexp,
    };

    handleSave(automata, false);
  };

  return (
    <div className="automata">
      <input
        className="name"
        placeholder="Название автомата"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />

      <textarea
        className="grammar"
        placeholder="Грамматика:&#10;S' -> S&#10;S -> aSb&#10;S -> $"
        value={grammar}
        onChange={(event) => {
          setGrammar(event.target.value);
        }}
      />

      <input
        className="regexp"
        placeholder="Регулярка"
        value={regexp}
        onChange={(event) => {
          setRegexp(event.target.value);
        }}
      />

      <div className="automata-img">
        {img !== "" && <img src={automata.image} alt="Empty automata" />}
      </div>

      <div className="buttons">
        <button className="simple-button" onClick={onClickBuild}>
          Построить
        </button>
        <button className="simple-button" onClick={onClickSave}>
          Сохранить
        </button>
        {handleDelete && (
          <button className="simple-button" onClick={onClickDelete}>
            Удалить
          </button>
        )}
        <ErrorMsg
          isCorrect={!isClickUnlogin}
          text="Для сохранения надо залогиниться"
          cssName="save-error"
        />
      </div>
    </div>
  );
}

// {
//   type: "SET_AUTOMATA",
//   payload: {name: "name", grammar: ["S", "SDS"], regexp: "reg", date: "13.10.2021", user_id: 1, id: 1},
// }
