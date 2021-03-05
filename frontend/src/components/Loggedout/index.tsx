import React from 'react';
import { Redirect, Link} from 'react-router-dom';
import userAPI from '../../services/userAPI';


const Loggedout = ({loggedout, onClick, pseudo, display}) => {


display();


  const logOut = () => {
  
  userAPI.logOut();
   onClick();

  }
  if(loggedout) {
    //clear local.storage
     userAPI.logout();
     window.location.replace("http://localhost:3000/");
   }

    return (
        <div>
                <div>{pseudo}</div>
                <div> <Link to="/compte"> Mon compte</Link > </div>
                <a href="/" onClick={logOut}>déconnectez-vous</a>

        </div>
        
    )
    
}
  


export default Loggedout;