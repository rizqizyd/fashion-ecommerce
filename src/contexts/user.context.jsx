import { createContext, useState, useEffect } from "react";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// centralize and clean up our architecture of our react application.
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
