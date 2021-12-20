export const SET_AUTOMATA = "SET_AUTOMATA";
export const SET_AUTOMATAS_LIST = "SET_AUTOMATAS_LIST";
export const SET_ERROR = "SET_ERROR";
export const SET_CLEAN = "SET_CLEAN";
export const DELETE_AUTOMATA = "DELETE_AUTOMATA";
export const SET_AUTOMATAS_LIST_MORE = "SET_AUTOMATAS_LIST_MORE";

const initialState = {
  automatasIdxs: [],
  automatas: {},
  isError: false,
  errorMsg: "",
  page: 0,
  count: 0,
};

export function automatas(state = initialState, action) {
  switch (action.type) {
    case SET_AUTOMATAS_LIST: {
      // console.log("SET_AUTOMATAS_LIST", state, action);
      return {
        ...state,
        automatasIdxs: action.payload.automatasIdxs,
        automatas: action.payload.automatas,
        isError: false,
        page: 1,
        count: action.payload.count,
      };
    }

    case SET_AUTOMATAS_LIST_MORE: {
      return {
        ...state,
        automatasIdxs: [
          ...state.automatasIdxs,
          ...action.payload.automatasIdxs,
        ],
        automatas: { ...state.automatas, ...action.payload.automatas },
        isError: false,
        page: state.page + 1,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        isError: true,
        errorMsg: action.payload,
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
        ...state,
        automatasIdxs,
        automatas: {
          ...state.automatas,
          [automata.id]: automata,
        },
        isError: false,
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
