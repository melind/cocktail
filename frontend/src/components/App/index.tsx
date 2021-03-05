import React ,{useEffect} from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';

import './index.css';


import Account from '../../containers/Account';
import EventInfo from '../EventInfo';
import ForgetPassword from '../../containers/ForgetPassword';
import Home from '../Home';
import Loggedout from '../../containers/Loggedout';
import Login from '../../containers/Login';
import Mail from '../../containers/Mail';
import Nav from '../Nav';
import NewPassword from '../../containers/NewPassword';
import NotFound  from '../NotFound';
import Password from '../../containers/Password';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Signup from '../../containers/Signup';
import TodayEvents from '../TodayEvents';
import UserName from '../../containers/UserName';
import WeekEvents from '../WeekEvents';
import userAPI from '../../services/userAPI';

const App = () => {

  setInterval(function () {
      userAPI.logout();
    }, (60*60*1000));


  
 const displayAuth = () => {
       const auth = document.getElementsByClassName('auth')[0] as HTMLElement;
       const un = document.getElementsByClassName('un')[0] as HTMLElement;
        if(userAPI.isAuth()) {
            auth.style.display='block';
            un.style.display='none';
          }
          else {
            auth.style.display='none';
            un.style.display='block';
          }

        }
  useEffect(() => {
    displayAuth();
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">

      <div className="brand-header">

           <div className="brand-name">
                World Wide Event
           </div>

           <div className="authentification">

              <div className="un authentificated">
               <Link to="/inscrivez-vous"> signup</Link >                
               <Link to="/connectez-vous"> login</Link >
              </div>
              
              <div className=" auth authentificated">
                < Loggedout/>
              </div>
           </div>
                   
      </div>  
         
      </header>
      <Nav />
      <Switch>
        <PublicRoute restricted={false} path="/" exact component={Home}/>
        <PublicRoute restricted={false} path="/:location/aujourdhui" exact component={TodayEvents}/>
        <PublicRoute restricted={false} path="/:location/semaine" exact component={WeekEvents}/>
        <PublicRoute restricted={false} path="/description/:eventName/:idEvent" exact component={EventInfo}/>
        <PrivateRoute path="/compte" exact component={Account}/>
        <PublicRoute restricted={true} path="/connectez-vous" exact  component={Login}/>
        <PublicRoute restricted={true} path="/mot-de-passe-oublie" exact  component={ForgetPassword}/>
        <PublicRoute restricted={true} path="/nouveau-mot-de-passe/:passwordResetToken" exact  component={NewPassword}/>
        <PrivateRoute path="/mise-a-jour-mail" exact component={Mail} />
        <PrivateRoute path="/mise-a-jour-mot-de-passe" exact component={Password} />
        <PublicRoute restricted={true} path="/inscrivez-vous" exact  component={Signup} />
        <PrivateRoute path="/mise-a-jour-pseudo" exact component={UserName} />
        <PublicRoute restricted={false}  path="/404" exact component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
