import React, {useEffect} from 'react';
import { Link} from 'react-router-dom';
//import './index.css';

const Confirm = (props, { init, confirmAccount,confirm, error}) => {
 
   
    let token = props.match.params.token;
    
   
    
    useEffect(() => {
      props.init();
      props.confirmAccount(token);
      }, []);

    return (

        <div className="confirm form">
        <h1>Account Confirm</h1>

        { props.confirm  ? (<div>You can login</div>) : (<div>{props.error} <br/><Link to="/resend-email">resend confirmation link . </Link></div>)}
       
        </div>

    )
    
} 

export default Confirm;