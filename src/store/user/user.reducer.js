// action reducer
import { USER_ACTION_TYPES } from "./user.types";

// initial state for userReducer
const INITIAL_STATE = {
  currentUser: null,
};

// useReducer function | We're not using useState to store that value anymore. We're now using a reducer.
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
