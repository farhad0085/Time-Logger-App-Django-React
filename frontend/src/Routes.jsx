import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import LogForm from "./pages/time_logs/LogForm";
import EditLog from "./pages/time_logs/EditLog";
import UsersPage from "./pages/time_logs/admin/UsersPage";
import EditProfilePage from "./pages/user/EditProfilePage";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFound/NotFound";
import LogoutPage from "./pages/auth/Logout";
import { useSelector } from 'react-redux'
import UserPage from "./pages/user/UserPage";
import ReportPage from "./pages/Report/ReportPage";


const Routes = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={HomePage} />
      <PrivateRoute path="/create-log" exact component={LogForm} />
      <PrivateRoute path="/report" exact component={ReportPage} />

      <PrivateRoute path="/log/update/:logId" exact component={EditLog} />
      <PrivateRoute path="/users" exact component={UsersPage} />
      <PrivateRoute path="/user/:userId" exact component={UserPage} />
      <PrivateRoute path="/edit-profile" exact component={EditProfilePage} />

      {/* auth routes */}
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute exact path="/register" component={RegisterPage} />

      <Route exact path="/logout" component={LogoutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;

export const GuestRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {!auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )}
        </>
      )}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )}
        </>
      )}
    />
  );
};
