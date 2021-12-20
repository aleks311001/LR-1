import { AutomataItem } from "../AutomataItem";
import "./allAutomatas.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  fetchAutomatas,
  fetchAutomatasMore,
  setError,
} from "../../actions/automatas";

export function AllAutomatas() {
  const dispatch = useDispatch();

  // const user = { id: 1 };
  const user = useSelector((state) => state.user.user) || {};
  const automatasIdxs = useSelector((state) => state.automatas.automatasIdxs);
  const errorMsg = useSelector((state) => state.automatas.errorMsg);
  const isError = useSelector((state) => state.automatas.isError);
  const count = useSelector((state) => state.automatas.count);

  React.useEffect(() => {
    if (user && user.id !== null && user.id !== undefined) {
      dispatch(fetchAutomatas());
    } else {
      dispatch(
        setError("Для просмотра сохраненных автоматов надо войти в аккаунт.")
      );
    }
  }, [user]);

  if (isError) {
    if (!errorMsg) {
      return <h1>Произошла ошибка.</h1>;
    } else {
      return <h1>{errorMsg}</h1>;
    }
  }

  if (automatasIdxs.length === 0) {
    return <h1>Пока нет ни одного автомата</h1>;
  }

  return (
    <>
      <div className="automatas-list">
        {automatasIdxs.map((automataId) => (
          <AutomataItem automataId={automataId} key={automataId} />
        ))}
      </div>

      <div className="more-automatas">
        {automatasIdxs.length < count && (
          <button
            className="simple-button"
            onClick={() => dispatch(fetchAutomatasMore())}
          >
            Показать еще
          </button>
        )}
      </div>
    </>
  );
}
