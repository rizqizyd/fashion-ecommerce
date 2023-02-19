import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  // dispatch the action object
  const dispatch = useDispatch();

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
      // setCurrentUser is an action user
      dispatch(setCurrentUser(user));
    });

    // unsubscribe whenever unmount
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
