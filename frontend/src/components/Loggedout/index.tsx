import React from 'react';
import {Link} from 'react-router-dom';
import userAPI from '../../services/userAPI';


const Loggedout = ({loggedout, onClick, pseudo, display}) => {


display();

  const URL = process.env.URL;
  const logOut = () => {
   //clear cookie
   userAPI.logOut();
   onClick();

  }
  if(loggedout) {
  //clear local.storage
   userAPI.logout();
     window.location.replace(URL||"http://localhost:3030/home");
   }

    return (
        <div>
                <div>{pseudo}</div>
                <div> <Link to="/account"> My account</Link > </div>
                <a href="/home" onClick={logOut}>Log out</a>

        </div>
        
    )
    
}
  


export default Loggedout;