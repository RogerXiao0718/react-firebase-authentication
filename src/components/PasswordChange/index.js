import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const initialState = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};
const PasswordChangeForm = props => {
  const [formState, setFormState] = useState(initialState);
  const firebase = useContext(FirebaseContext);

  const isValid =
    formState.passwordOne === formState.passwordTwo &&
    formState.passwordOne !== "" &&
    formState.passwordTwo !== "";

  const onChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(formState.passwordOne)
      .then(() => {
        console.log("your password is changed");
      })
      .catch(error => {
        setFormState({
          ...formState,
          error: error
        });
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          name="passwordOne"
          onChange={onChange}
          placeholder="New password"
          value={formState.passwordOne}
        />
        <hr />
        <input
          type="password"
          name="passwordTwo"
          onChange={onChange}
          placeholder="New password Again"
          value={formState.passwordTwo}
        />
        <hr />
        <button type="submit" disabled={isValid}>
          Change my password
        </button>
      </form>
    </div>
  );
};

export default PasswordChangeForm
