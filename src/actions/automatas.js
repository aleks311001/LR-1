import { schema, normalize } from "normalizr";
import {
  SET_AUTOMATAS_LIST,
  SET_AUTOMATA,
  SET_CLEAN,
  SET_ERROR,
  SET_ACCESS_DENIED,
  DELETE_AUTOMATA,
} from "../reducers/automatas";
import { ApiClientService } from "../services/ApiClientService";

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

export function deleteAutomata(automataId) {
  return {
    type: DELETE_AUTOMATA,
    payload: automataId,
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
      const data = await ApiClientService(`automatas?user_id=${user_id}`);
      dispatch(setAutomatas(data.results));
    } catch {
      dispatch(setError());
    }
  };
}

export function fetchAutomata(user_id, automata_id) {
  return async (dispatch) => {
    try {
      const data = await ApiClientService(`automatas/${automata_id}`);

      if (data.user_id === user_id) {
        dispatch(setAutomata(data.results));
      } else {
        dispatch(setAccessDenied());
      }
    } catch {
      dispatch(setError());
    }
  };
}
