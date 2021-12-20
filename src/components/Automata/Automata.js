import "./automata.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAutomata } from "../../actions/automatas";
import { Spinner } from "../Spinner";
import { ErrorMsg } from "../Sign/ErrorMsg";
import { ApiClientService } from "../../services/ApiClientService";
import { HOST_ADDR } from "../../constants/constants";

export function Automata(props) {
  const { automataId, handleSave, handleDelete } = props;
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
  const errorMsg = useSelector((state) => state.automatas.errorMsg);

  const [name, setName] = React.useState(automata.name);
  const [grammar, setGrammar] = React.useState(automata.grammar);
  const [word_checked, setWord] = React.useState(automata.word_checked);
  const [image, setImage] = React.useState(automata.image);
  const [word_result, setResult] = React.useState(automata.word_result);

  const [isClickUnlogin, setIsClick] = React.useState(false);

  React.useEffect(() => {
    if (automataStore || !automataId) {
      return;
    }
    dispatch(fetchAutomata(automataId));
  }, []);

  // React.useEffect(() => {
  //   setName(automata.name);
  //   setGrammar(automata.grammar);
  //   setWord(automata.word_checked);
  // }, [automata]);

  if (automataId) {
    if (isError) {
      if (!errorMsg) {
        return <h1>Произошла ошибка при загрузке автомата</h1>;
      } else {
        return <h1>{errorMsg}</h1>;
      }
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
      word_checked: word_checked || "",
      // image: (image || "").split("/media/")[1],
    };

    handleSave(automata, true);
  };

  const onClickDelete = (event) => {
    event.preventDefault();
    handleDelete(automataId);
  };

  const onClickBuild = async (event) => {
    event.preventDefault();

    const automata = {
      name,
      grammar,
      word_checked: word_checked || "",
    };

    const response = await fetch(`http://${HOST_ADDR}/build/`, {
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(automata),
      method: "POST",
    });
    const data = await response.json();

    // console.log(data);

    setImage(data.image);
    setResult(data.ans);
  };

  // const onClickCheck = (event) => {
  //   event.preventDefault();
  // };

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
        className="word_checked"
        placeholder="Проверяемое слово"
        value={word_checked}
        onChange={(event) => {
          setWord(event.target.value);
        }}
      />

      <div className="automata-img">
        {image && image !== "" && <img src={image} alt="Empty automata" />}
        {(!image || image === "") && <h1>Здесь будет построенный автомат</h1>}
      </div>

      <div className="word_result">
        {word_result !== undefined &&
          (word_result ? (
            <p className="word-in-lang">В языке</p>
          ) : (
            <p className="word-not-in-lang">Нет в языке</p>
          ))}
      </div>

      <div className="buttons">
        <button className="simple-button" onClick={onClickBuild}>
          Построить
        </button>
        {/*<button className="simple-button" onClick={onClickCheck}>*/}
        {/*  Проверить*/}
        {/*</button>*/}
        <button className="simple-button" onClick={onClickSave}>
          Сохранить
        </button>
        {handleDelete && (
          <button className="simple-button" onClick={onClickDelete}>
            Удалить
          </button>
        )}
        <div>
          {isClickUnlogin && (
            <p className="save-error">Для сохранения надо залогиниться</p>
          )}
        </div>
      </div>
    </div>
  );
}

// {
//   type: "SET_AUTOMATA",
//   payload: {name: "name", grammar: ["S", "SDS"], word_checked: "reg", date: "13.10.2021", user_id: 1, id: 1},
// }
