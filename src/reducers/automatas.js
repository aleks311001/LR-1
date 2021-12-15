export const SET_AUTOMATA = "SET_AUTOMATA";
export const SET_AUTOMATAS_LIST = "SET_AUTOMATAS_LIST";
export const SET_ERROR = "SET_ERROR";
export const SET_CLEAN = "SET_CLEAN";
export const SET_ACCESS_DENIED = "SET_ACCESS_DENIED";
export const DELETE_AUTOMATA = "DELETE_AUTOMATA";

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
        ...state,
        isError: true,
      };
    }

    case SET_ACCESS_DENIED: {
      return {
        ...state,
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

    case DELETE_AUTOMATA: {
      const automataId = action.payload;
      return {
        ...state,
        automatasIdxs: state.automatasIdxs.filter(function (item) {
          return item !== automataId;
        }),
      };
    }

    default: {
      return state;
    }
  }
}
