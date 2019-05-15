import  { useEffect } from "react";
import * as ROUTES from "../../constants/routes";
/* 測試用, 理由是目前在已登入情況下直接使用更改URL方式連到
 localhost:3000時會因為原本的useAuthorization而跳回LandingPage */
const useAuthorizationTest = (payloads, condition) => {
  useEffect(() => {
    const listener = payloads.firebase.auth.onAuthStateChanged(authUser => {
      if (!condition(payloads.authUser)) {
        payloads.history.push(ROUTES.LANDING);
      }
    });
    return () => {
      listener();
    };
  }, [condition, payloads.authUser, payloads.firebase.auth, payloads.history]);
};

export default useAuthorizationTest;
