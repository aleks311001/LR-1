const initialState = {
  user: null,
};

export const SET_USER = "SET_USER";
export const CLEAN_USER = "CLEAN_USER";

export function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload,
      };

    case CLEAN_USER:
      // console.log("HERE");
      return {
        user: null,
      };

    default:
      return state;
  }
}
