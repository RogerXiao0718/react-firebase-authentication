import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { SignUpLink } from "../SignUp";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import { connect } from "react-redux";

const SignInPage = props => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const SignInFormBase = props => {
  const initialFormState = {
    email: "",
    password: ""
  };
  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(null);
  const firebase = useContext(FirebaseContext);

  const isValid = formState.email !== "" && formState.password !== "";

  const onSubmit = event => {
    const { email, password } = formState;
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        setFormState(initialFormState);
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };
  const onChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        Email:{" "}
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          onChange={onChange}
          value={formState.email}
        />
        <hr />
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={formState.password}
        />
        <hr />
        <button type="submit" disabled={!isValid}>
          Sign In
        </button>
      </form>
      {error && <p>{error.message}</p>}
      <p>Forget your password? <Link to={ROUTES.PASSWORDFORGET}>Password Forget</Link></p>
    </div>
  );
};

const withStore = connect(
  null,
  null
);
const SignInForm = compose(withRouter)(SignInFormBase);

export default SignInPage;
