export const SET_AUTOMATA = "SET_AUTOMATA";
export const SET_AUTOMATAS_LIST = "SET_AUTOMATAS_LIST";
export const SET_ERROR = "SET_ERROR";
export const SET_CLEAN = "SET_CLEAN";
export const SET_ACCESS_DENIED = "SET_ACCESS_DENIED";

const initialState = {
  automatasIdxs: [],
  automatas: {},
  isError: false,
  isAccessDenied: false,
};

export function automatas(state = initialState, action) {
  switch (action.type) {
    case SET_AUTOMATAS_LIST: {
      // console.log("SET_AUTOMATAS_LIST", state, action);
      return {
        automatasIdxs: action.payload.automatasIdxs,
        automatas: action.payload.automatas,
        isError: false,
        isAccessDenied: false,
      };
    }

    case SET_ERROR: {
      return {
        automatasIdxs: state.automatasIdxs,
        automatas: state.automatas,
        isError: true,
        isAccessDenied: false,
      };
    }

    case SET_ACCESS_DENIED: {
      return {
        automatasIdxs: state.automatasIdxs,
        automatas: state.automatas,
        isError: false,
        isAccessDenied: true,
      };
    }

    case SET_AUTOMATA: {
      // console.log("SET_AUTOMATA", state, action);
      const automata = action.payload;
      let automatasIdxs = state.automatasIdxs;

      if (!automatasIdxs.includes(automata.id)) {
        automatasIdxs.push(automata.id);
      }

      return {
        automatasIdxs,
        automatas: {
          ...state.automatas,
          [automata.id]: automata,
        },
        isError: false,
        isAccessDenied: false,
      };
    }

    case SET_CLEAN: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
