import { SET_USER, CLEAN_USER } from "../reducers/user";

export function setUser(payload) {
  return {
    type: SET_USER,
    payload,
  };
}

export function exitUser() {
  window.localStorage.clear();

  return {
    type: CLEAN_USER,
  };
}
