import React from "react";
import { useCookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const [cookies] = useCookies(["token"]);
  let Token = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={() => {
        return Token ? children : <Redirect to="/signin" />;
      }}
    />
  );
}

export default PrivateRoute;
