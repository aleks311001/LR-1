import { AutomataItem } from "../AutomataItem";
import "./allAutomatas.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchAutomatas } from "../../actions/automatas";

export function AllAutomatas() {
  const dispatch = useDispatch();

  // const user = { id: 1 };
  const user = useSelector((state) => state.user.user) || {};
  const automatasIdxs = useSelector((state) => state.automatas.automatasIdxs);
  const isAccessDenied = useSelector((state) => state.automatas.isAccessDenied);
  const isError = useSelector((state) => state.automatas.isError);

  React.useEffect(() => {
    dispatch(fetchAutomatas(user.id));
  }, []);

  if (isAccessDenied) {
    return <h1>Для просмотра сохраненных автоматов надо войти в аккаунт</h1>;
  }

  if (isError) {
    return <h1>Произошла ошибка!</h1>;
  }

  if (automatasIdxs.length === 0) {
    return <h1>Пока нет ни одного автомата</h1>;
  }

  return (
    <div className="automatas-list">
      {automatasIdxs.map((automataId) => (
        <AutomataItem automataId={automataId} key={automataId} />
      ))}
    </div>
  );
}
