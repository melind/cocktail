import React from 'react';
import { Route,  Redirect } from 'react-router-dom';
import userAPI from '../../services/userAPI';

const PublicRoute = ({ component: Component,restricted, ...rest }) => (
  <Route
    {...rest} //contains the React Router props when the initial component is rendered
    render={props => (
      userAPI.isAuth() && restricted ? <Redirect to="/" /> : <Component {...props} />
      
     )}
  />
);

export default PublicRoute;