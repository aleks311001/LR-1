import { schema, normalize } from "normalizr";
import {
  SET_AUTOMATAS_LIST,
  SET_AUTOMATA,
  SET_CLEAN,
  SET_ERROR,
  SET_ACCESS_DENIED,
} from "../reducers/automatas";

const automataSchema = new schema.Entity("automatas");

function setAutomatas(data) {
  // console.log(data);
  const { result, entities } = normalize(data, [automataSchema]);
  // console.log(result, entities);

  return {
    type: SET_AUTOMATAS_LIST,
    payload: {
      automatasIdxs: result,
      automatas: entities.automatas,
    },
  };
}

export function setAutomata(data) {
  return {
    type: SET_AUTOMATA,
    payload: data,
  };
}

function setError() {
  return {
    type: SET_ERROR,
  };
}

function setAccessDenied() {
  return {
    type: SET_ACCESS_DENIED,
  };
}

export function setClean() {
  return {
    type: SET_CLEAN,
  };
}

export function fetchAutomatas(user_id) {
  return async (dispatch) => {
    if (!user_id) {
      dispatch(setAccessDenied());
      return;
    }

    try {
      // console.log("fetch");
      const response = await fetch(
        `http://localhost:3001/automatas?user_id=${user_id}`
      );
      // console.log("response");
      const data = await response.json();
      // console.log("dispatch");
      dispatch(setAutomatas(data));
      // console.log("end");
    } catch {
      dispatch(setError());
    }
  };
}

export function fetchAutomata(user_id, automata_id) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/automatas/${automata_id}`
      );
      const data = await response.json();

      if (data.user_id === user_id) {
        dispatch(setAutomata(data));
      } else {
        dispatch(setAccessDenied());
      }
    } catch {
      dispatch(setError());
    }
  };
}
