import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebsae";
import { connect } from "react-redux";
import {compose} from 'recompose'

import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  const mapStateToUser = store => ({
    authUser: store.authUser,
    username: store.username
  });

  const withConnect = connect(mapStateToUser)

  const AuhtorizedComponentBase = props => {
    const firebase = useContext(FirebaseContext);
    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
          console.log(firebase)
        }
      });
      return listener;
    }, []);
  };
   const AuthorizedComponent = compose(withRouter, mapStateToUser)(AuhtorizedComponentBase)

   return AuthorizedComponent
};

export default withAuthorization;
