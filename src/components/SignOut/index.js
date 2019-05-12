import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";

const SignOutButtonBase = props => {
  const firebase = useContext(FirebaseContext);
  const onClick = event => {
    firebase.doSignOut();
    props.history.push(ROUTES.LANDING);
  };

  return <button onClick={onClick}>Sign Out</button>;
};

const withStore = connect();
const SignOutButton = compose(
  withStore,
  withRouter
)(SignOutButtonBase);

export default SignOutButton;
