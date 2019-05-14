import React, { useState, useEffect, useContext } from "react";
import * as ROUTES from "../../constants/routes";


const useAuthorization = (payloads, condition) => {
  useEffect(() => {
    const listener = payloads.firebase.auth.onAuthStateChanged(authUser => {
      if (!condition(authUser)) {
        payloads.history.push(ROUTES.SIGN_IN);
      }
    });
    return listener;
  },  [condition, payloads.authUser, payloads.firebase.auth, payloads.history]);
};

export default useAuthorization;
