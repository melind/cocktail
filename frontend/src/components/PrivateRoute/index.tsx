import React from 'react';
import { Route,  Redirect } from 'react-router-dom';
import userAPI from '../../services/userAPI';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} //contains the React Router props when the initial component is rendered
    render={props => ( 
     userAPI.isAuth() ?  <Component {...props} /> : <Redirect to="/" />
      
      )}
  />
);

export default PrivateRoute;