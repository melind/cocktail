import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import userAPI from '../../services/userAPI';


const Loggedout = ({loggedout, onClick, pseudo, display, init}) => {



 
  const URL = process.env.REACT_APP_URL_HOME;
  const logOut = () => {
   //clear cookie
   userAPI.logOut();
   onClick();

  }
  if(loggedout) {
  //clear local.storage
   userAPI.logout();
   init();
     window.location.replace(URL);
   }
   useEffect(() => {
    
    display();
    }, []);
    return (
        <div>
                <div>{pseudo}</div>
                <div> <Link to="/account"> My account</Link > </div>
                <a href="/home" onClick={logOut}>Log out</a>

        </div>
        
    )
    
}
  


export default Loggedout;