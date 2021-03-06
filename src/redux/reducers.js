import { combineReducers } from "redux";

const authInitialState = {
  authUser: null,
  username: ''
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
    case "SIGN_IN":
      return {
        ...state,
        authUser: action.authUser,
        username: action.username || 'no name'
      };
    case "SIGN_OUT":
      return {
        ...state,
        authUser: null
      };
    default:
      return state;
  }
};

const allReducer = {
  auth: authReducer
};
const reducer = combineReducers(allReducer);

export default reducer;
export { authReducer };
