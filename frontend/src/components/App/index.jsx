import React ,{useEffect} from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';

import './index.css';


import Account from '../../containers/Account.js';
import Admin from '../Admin/index.jsx';
import CocktailsAlcoholic from '../CocktailsAlcoholic/index.jsx';
import CocktailsByIngredient from '../CocktailsByIngredient/index.jsx';
import CocktailsNonAlcoholic from '../CocktailsNonAlcoholic/index.jsx';
import CocktailInfo from '../CocktailInfo/index.jsx';
import Confirm from '../../containers/Confirm.js';
import Footer from '../Footer/index.jsx';
import ForgetPassword from '../../containers/ForgetPassword.js';
import Home from '../Home/index.jsx';
import LegalMentions from '../LegalMentions/index.jsx';
import Loggedout from '../../containers/Loggedout.js';
import Login from '../../containers/Login.js';
import Mail from '../../containers/Mail.js';
import Nav from '../Nav/index.jsx';
import NewPassword from '../../containers/NewPassword.js';
import NotFound  from '../NotFound/index.jsx';
import Password from '../../containers/Password.js';
import PrivateRoute from '../PrivateRoute/index.jsx';
import PublicRoute from '../PublicRoute/index.jsx';
import ResendToken from '../../containers/ResendToken.js';
import Signup from '../../containers/Signup.js';
import UserName from '../../containers/UserName.js';


import userAPI from '../../services/userAPI/index.js';
import logo1 from '../../icones/peche1.svg';

const App = () => {

  setInterval(function () {
      userAPI.logout();
    }, (60*60*1000));

/*
  
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

   <div className="authentification">

              <div className="un authentificated">
               <Link to="/signup"> signup</Link >                
               <Link to="/login"> login</Link >
              </div>
              
              <div className=" auth authentificated">
                < Loggedout/>
              </div>
           </div>

  */
  return (
    <div className="App">
      <header className="App-header">

      <div className="brand-header">

           <div className="brand-name">
                <img src={logo1} width="70" alt="pêche melba icone"/> Cocktail !!
           </div>

          
          
                   
      </div>  
         
      </header>
      <Nav />
      <Switch>
        <Redirect exact strict from="/" to="home" />
        <PublicRoute restricted={false} path="/home" exact component={Home}/>
        <PublicRoute restricted={false} path="/cocktails_alcoholic" exact component={CocktailsAlcoholic}/>
        <PublicRoute restricted={false} path="/cocktails_non_alcoholic" exact component={CocktailsNonAlcoholic}/>
        <PublicRoute restricted={false} path="/cocktail/:cocktail_name" exact component={CocktailInfo}/>
        <PublicRoute restricted={false} path="/cocktails_by_ingredient/:ingredient" exact component={CocktailsByIngredient}/>
        <PrivateRoute path="/account" exact component={Account}/>
        <PrivateRoute path="/admin-938-kml" exact  component={Admin}/>
        <PublicRoute restricted={true} path="/login" exact  component={Login}/>
        <PublicRoute restricted={true} path="/forget-passord" exact  component={ForgetPassword}/>
        <PublicRoute restricted={true} path="/new-password/:passwordResetToken" exact  component={NewPassword}/>
        <PrivateRoute path="/update-mail" exact component={Mail} />
        <PrivateRoute path="/update-password" exact component={Password} />
        <PublicRoute restricted={true} path="/signup" exact  component={Signup} />
        <PublicRoute restricted={true} path="/confirm/:token" exact component={Confirm}/>
        <PublicRoute restricted={true} path="/resend-email" exact  component={ResendToken} />
        <PrivateRoute path="/update-pseudo" exact component={UserName} />
        <PublicRoute restricted={false} path="/legal-mentions" exact component={LegalMentions}/>
        <PublicRoute restricted={false}  path="/404" exact component={NotFound}/>
          <Redirect to="/404" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
