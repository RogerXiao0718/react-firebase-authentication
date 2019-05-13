import authContext from "./Context";
import React, { useState, useEffect, useContext, createContext } from "react";
import { FirebaseContext } from "../Firebase";
import { connect } from "react-redux";
import {withFirebase} from '../Firebase'

const withAuthentication = Component => props => {
  const WithAuthentication = props => {
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
            type: "SIGN_OUT"
          });
        }
      });

      return () => {
        listener();
      };
    });

    return (
      <authContext.Consumer>
        {authUser => <Component {...props} authUser={authUser} />}
      </authContext.Consumer>
    );
  };
  const ConnectedComponent =  connect()(WithAuthentication)
  return (
      <ConnectedComponent {...props} />
  )
};

export default withAuthentication;
