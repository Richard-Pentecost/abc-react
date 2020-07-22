import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ path, isAdmin, component, ...props }) => {
  const Component = component;
  return (
    <Route
      {...props}
      path={path}
      render={routeProps => (isAdmin ?
        <Component {...routeProps} {...props} /> :
        <Redirect to='/' />
      )}
    />
  );
};


export default AdminRoute;