import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const PasswordForgetForm = props => {
  const initialState = {
    email: "",
    error: null
  };
  const [formState, setFormState] = useState(initialState);

  const firebase = useContext(FirebaseContext);

  const onSubmit = event => {
    const { email } = formState;

    firebase
      .doPasswordReset(email)
      .then(() => {
        setFormState(initialState);
      })
      .catch(error =>
        setFormState(state => ({
          ...state,
          error
        }))
      );
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
          onChange={onChange}
          placeholder="Email Address"
          value={formState.email}
        />
        <hr />
        <button type="submit">Reset my email</button>
      </form>
    </div>
  );
};

const PasswordForgetLink = () => (
  <p>
    Forget your password?{" "}
    <Link to={ROUTES.PASSWORD_FORGET}>Password forget</Link>
  </p>
);

export default PasswordForgetPage;
export { PasswordForgetLink };
