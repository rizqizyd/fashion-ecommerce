// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

// import {
  // auth,
  // signInWithGooglePopup,
  // signInWithGoogleRedirect,
  // createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
  // other way to sign in with google redirect
  // useEffect(() => async () => {
  //   const response = await getRedirectResult(auth);
  //   // console.log(response);
  //   if (response) {
  //     await createUserDocumentFromAuth(response.user);
  //   }
  // }, []);

  // sign in with google popup
  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   // console.log(response);
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <div className="authentication-container">
      {/* <h1>Sign In Page</h1> */}
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}

      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
