import React ,{useEffect} from 'react';
import { Route, Switch, Redirect, Link} from 'react-router-dom';

import './index.css';


import Account from '../../containers/Account';
import Admin from '../Admin';
import CocktailsAlcoholic from '../CocktailsAlcoholic';
import CocktailsByIngredient from '../CocktailsByIngredient';
import CocktailsNonAlcoholic from '../CocktailsNonAlcoholic';
import CocktailInfo from '../CocktailInfo';
import Footer from '../Footer';
import ForgetPassword from '../../containers/ForgetPassword';
import Home from '../Home';
import LegalMentions from '../LegalMentions';
import Loggedout from '../../containers/Loggedout';
import Login from '../../containers/Login';
import Mail from '../../containers/Mail';
import Nav from '../Nav';
import NewPassword from '../../containers/NewPassword';
import NotFound  from '../NotFound';
import Password from '../../containers/Password';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import ResendToken from '../../containers/ResendToken';
import Signup from '../../containers/Signup';
import UserName from '../../containers/UserName';


import userAPI from '../../services/userAPI';
import logo1 from '../../icones/peche1.svg';

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
                <img src={logo1} width="70" alt="pêche melba icone"/> Cocktail !!
           </div>

           <div className="authentification">

              <div className="un authentificated">
               <Link to="/signup"> signup</Link >                
               <Link to="/login"> login</Link >
              </div>
              
              <div className=" auth authentificated">
                < Loggedout/>
              </div>
           </div>
                   
      </div>  
         
      </header>
      <Nav />
      <Switch>
        <PublicRoute restricted={false} path="/home" exact component={Home}/>
        <PublicRoute restricted={false} path="/cocktails_alcoholic" exact component={CocktailsAlcoholic}/>
        <PublicRoute restricted={false} path="/cocktails_non_alcoholic" exact component={CocktailsNonAlcoholic}/>
        <PublicRoute restricted={false} path="/cocktail/:cocktail_name" exact component={CocktailInfo}/>
        <PublicRoute restricted={false} path="/cocktails_by_ingredient/:ingredient" exact component={CocktailsByIngredient}/>
        <PrivateRoute path="/account" exact component={Account}/>
        <PrivateRoute path="/admin" exact  component={Admin}/>
        <PublicRoute restricted={true} path="/login" exact  component={Login}/>
        <PublicRoute restricted={true} path="/forget-passord" exact  component={ForgetPassword}/>
        <PublicRoute restricted={true} path="/new-password/:passwordResetToken" exact  component={NewPassword}/>
        <PrivateRoute path="/update-mail" exact component={Mail} />
        <PrivateRoute path="/update-password" exact component={Password} />
        <PublicRoute restricted={true} path="/signup" exact  component={Signup} />
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
