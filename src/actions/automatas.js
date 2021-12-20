import { schema, normalize } from "normalizr";
import {
  SET_AUTOMATAS_LIST,
  SET_AUTOMATA,
  SET_CLEAN,
  SET_ERROR,
  SET_ACCESS_DENIED,
  DELETE_AUTOMATA,
  SET_AUTOMATAS_LIST_MORE,
} from "../reducers/automatas";
import { ApiClientService } from "../services/ApiClientService";
import { BAD_REFRESH_TOKEN } from "../constants/constants";
import { exitUser, setUser } from "./user";

const automataSchema = new schema.Entity("automatas");

function setAutomatas(data, count) {
  // console.log(data);
  const { result, entities } = normalize(data, [automataSchema]);
  // console.log(result, entities);

  return {
    type: SET_AUTOMATAS_LIST,
    payload: {
      count,
      automatasIdxs: result,
      automatas: entities.automatas,
    },
  };
}

function setAutomatasMore(data) {
  const { result, entities } = normalize(data, [automataSchema]);

  return {
    type: SET_AUTOMATAS_LIST_MORE,
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

export function setError(errorMsg) {
  return {
    type: SET_ERROR,
    payload: errorMsg,
  };
}

export function setClean() {
  return {
    type: SET_CLEAN,
  };
}

export function fetchAutomatas() {
  return async (dispatch) => {
    try {
      const data = await ApiClientService(`automatas/`);
      // console.log(data);
      if (data !== BAD_REFRESH_TOKEN) {
        dispatch(setAutomatas(data.results, data.count));
      } else {
        dispatch(exitUser());
      }
    } catch {
      dispatch(setError());
    }
  };
}

export function fetchAutomatasMore() {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const page = state.automatas.page;
      // console.log(page, user_id);
      const data = await ApiClientService(`automatas?page=${page + 1}`);
      if (data !== BAD_REFRESH_TOKEN) {
        dispatch(setAutomatasMore(data.results));
      } else {
        dispatch(exitUser());
      }
    } catch {
      dispatch(setError());
    }
  };
}

export function fetchAutomata(automata_id) {
  return async (dispatch) => {
    try {
      const data = await ApiClientService(`automatas/${automata_id}`);

      if (data === BAD_REFRESH_TOKEN) {
        dispatch(exitUser());
        return;
      }

      if (data.detail === "Not found.") {
        dispatch(setError("Автомат не найден."));
      } else {
        dispatch(setAutomata(data));
      }
    } catch {
      dispatch(setError());
    }
  };
}
