import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// action reducer
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// useReducer function | We're not using useState to store that value anymore. We're now using a reducer.
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// initial state for userReducer
const INITIAL_STATE = {
  currentUser: null,
};

// centralize and clean up our architecture of our react application.
export const UserProvider = ({ children }) => {
  // dispatching action reducer
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = user => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  // onlyrun this function once when the component mounts
  useEffect(() => {
    // The moment that this listener mounts, it will check the authentication state automatically when you initialize the listener.

    // receives some kind of callback function
    // It returns us back a function that will unsubscribe, i.e. stop listening.
    const unsubscribe = onAuthStateChangedListener(user => {
      // now we've centralized our sign out and sign in into this listener callback.
      // console.log(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    // unsubscribe whenever unmount
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
