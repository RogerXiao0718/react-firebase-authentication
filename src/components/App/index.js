import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";

const AppBase = props => {
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        props.dispatch({
          type: "SIGN_IN",
          authUser: authUser
        });
      } else {
        props.dispatch({
          type: "SIGN_OUT",
          authUser: authUser
        });
      }
    });
    return listener;
  }, [firebase.auth, props]);

  return (
    <Router>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </Router>
  );
};

const App = connect()(AppBase);

export default App;
