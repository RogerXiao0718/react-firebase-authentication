import { useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => {
  const mapStateToUser = store => ({
    authUser: store.authUser,
    username: store.username
  });

  const AuhtorizedComponentBase = props => {
    const firebase = useContext(FirebaseContext);
    useEffect(() => {
      const listener = firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          props.history.push(ROUTES.SIGN_IN);
        }
      });
      return listener;
    }, [firebase.auth, props.history]);
  };
  const AuthorizedComponent = compose(
    withRouter,
    mapStateToUser
  )(AuhtorizedComponentBase);

  return AuthorizedComponent;
};

export default withAuthorization;
