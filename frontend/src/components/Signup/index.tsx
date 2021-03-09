import React, { useState } from 'react';
//import './index.css';
import { Link, useHistory } from 'react-router-dom';
import  displayError  from '../../lib/validation';
import {Button, Input} from 'antd';
import './index.css';
// component = function return element to display
const Signup = ({pseudo, mail, password, onSubmit, error, init}) => {
    const URL = process.env.REACT_APP_URL;
    setTimeout(function () {
        init();
    
      }, 1000);


    const [formState, setFormState] = useState({pseudo, mail, password});
    const [validateMail, setValidateMail] = useState(true); 
    const [validatePassword, setValidatePassword] = useState(true); 

    const handleChange = (e) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        
        setFormState({...formState, [name]: value}); // name_input : input_value
        
       
            
    }

   const result = displayError(formState); 
 

   const handleSubmit = (e) => {
          e.preventDefault();
          
          if (result[0] === undefined && result[2] === undefined) { 
          onSubmit(formState);
          window.location.replace(URL||"http://localhost:3000/login");
          }
         result[0] ? setValidateMail(false): setValidateMail(true);
          
         result[2] ? setValidatePassword(false) : setValidatePassword(true);
     
      }
     
   

    return (

        <div className="form"> 

        <h1>Sign Up</h1><br/>

         <form onSubmit={handleSubmit} action="/signup" method="POST" >
          <label htmlFor="pseudo">Pseudo : </label><Input className="input" id="pseudo" name="pseudo" placeholder="Entrer votre pseudo" onChange={handleChange} value={formState.pseudo} required></Input> <br/>
          <label htmlFor="mail">E-mail : </label><Input className="input" id="mail" name="mail" placeholder="Entrer votre e-mail" onChange={handleChange} value={formState.mail} required></Input> <br/>
          <label htmlFor="password"> Password : </label><Input className="input" id="password" name="password" type="password" placeholder="Entrer votre mot de passe" onChange={handleChange} value={formState.password} required></Input> < br/><br/>
          <Button htmlType="submit" >Submit</Button>
          
          { validateMail  ? " " : result[0]} { validatePassword  ? " " : result[2]} <p>  
            <Link to="/login">Have an account ?</Link>
          </p>
        </form>
        
        </div>

    )
    
} 

export default Signup;