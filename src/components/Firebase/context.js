import React from "react";

const FirebaseContext = React.createContext(null);
const withFirebase = Component => props => (
  <FirebaseContext>
    {firebase => <Component firebase={firebase} {...props} />}
  </FirebaseContext>
);

export default FirebaseContext;
export { withFirebase };
