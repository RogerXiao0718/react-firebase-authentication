import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import { FirebaseContext } from "../Firebase";
import { useAuthorizationTest } from "../Session";

const AccountPageBase = props => {
  const firebase = useContext(FirebaseContext);
  const condition = authUser => authUser;
  useAuthorizationTest(
    {
      history: props.history,
      firebase: firebase,
      authUser: props.authUser
    },
    condition
  );
  return (
    <div>
      <h1>AccountPage</h1>
      <p>{props.authUser && props.authUser.email}</p>
    </div>
  );
};

const mapStateToProps = store => ({
  authUser: store.auth.authUser
});
const withConnect = connect(mapStateToProps);
const AccountPage = compose(
  withRouter,
  withConnect
)(AccountPageBase);

export default AccountPage;
