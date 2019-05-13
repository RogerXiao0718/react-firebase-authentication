import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import { connect } from "react-redux";

const NavigationBase = ({ authUser, dispatch }) => (
  <div>
    <ul>
      {!authUser && (
        <li>
          <Link to={ROUTES.SIGN_IN}>SignIn</Link>
        </li>
      )}
      {!authUser && (
        <li>
          <Link to={ROUTES.SIGN_UP}>SignUp</Link>
        </li>
      )}
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      {authUser && (
        <li>
          <SignOutButton />
        </li>
      )}
    </ul>
  </div>
);
const mapStateToProps = state => {
  return {
    authUser: state.auth.authUser
  };
};
const Navigation = connect(mapStateToProps)(NavigationBase);

export default Navigation;
export { NavigationBase };
