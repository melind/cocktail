import React, { useState, useEffect } from 'react';
//import './index.css';
import { Redirect, Link } from 'react-router-dom';
import  displayError  from '../../lib/validationPassword';
import {Input} from 'antd';
// component = function return element to display
const Password = ({password, error, onSubmit, init}) => {

    const URL_ACCOUNT = process.env.REACT_APP_URL_ACCOUNT;
 
    const [formState, setFormState] = useState({password});
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setFormState({...formState, [name]: value}); // name_input : input_value
        
   
    }

   const result = displayError(formState); 

 const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!result[0]) { 
          onSubmit(formState);
           
        }
      
       
   
    }
    if(error === false) {
        window.location.replace(URL_ACCOUNT);
     }
     let password_input = document.getElementById("password") ;
     let confirm_password_input = document.getElementById("confirm_password") ;
   
     const confirmPassword = ()  => {
       if(password_input.value != confirm_password_input.value) {
         confirm_password_input.setCustomValidity("Passwords Don't Match");
       } else {
         confirm_password_input.setCustomValidity('');
       }
     }
     
     let eye = document.getElementById("eye") ;
     
    
      const toggle = ()  => {
        const type = password_input.getAttribute('type') === 'password' ? 'text' : 'password';
        password_input.setAttribute('type', type);
        eye.classList.toggle("fa-eye-slash")
      }
    useEffect(() => {
        init();
        }, []);
    return (

        <div className="setAccount form">
        <h1>Set your password</h1>
        <Link to="/account" className="return"> Back </Link>
         <form onSubmit={handleSubmit} action="/update-password" method="POST" >
         <label htmlFor="password"> Password : </label> < br/><Input onKeyUp={confirmPassword} className="input" id="password" name="password" type="password" placeholder="Entrer votre password" onChange={handleChange} value={formState.password} required></Input><i id="eye" onClick={toggle} className="fa fa-eye" aria-hidden="true"></i>< br/> < br/>
          <label htmlFor="confirm_password"> Confirm Password : </label> < br/><Input onKeyUp={confirmPassword} className="input" id="confirm_password" name="confirm_password" type="password" placeholder="Confirm password"  required></Input> < br/><br/>
          <button type="submit"  >Submit</button> < br/> < br/>

          <p>  {result} {error}</p>
        </form>
       
        </div>

    )
    
} 

export default Password;