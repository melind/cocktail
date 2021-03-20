import React, { useState } from 'react';
//import './index.css';
import { Link, useHistory } from 'react-router-dom';
import  displayError  from '../../lib/validation';
import {Button, Input} from 'antd';
import './index.css';
// component = function return element to display
const Signup = ({pseudo, mail, password, onSubmit, error, init}) => {
    const URL = process.env.REACT_APP_URL_LOGIN;
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
          if(error === false){ 
          window.location.replace(URL);
          }
          else {
            alert('signup failed')
          }
          }
         result[0] ? setValidateMail(false): setValidateMail(true);
          
         result[2] ? setValidatePassword(false) : setValidatePassword(true);
     
      } 
      
      let password_input = document.getElementById("password") as HTMLInputElement;
      let confirm_password_input = document.getElementById("confirm_password") as HTMLInputElement;
    
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
    
   

    return (

        <div className="form"> 

        <h1>Sign Up</h1><br/>

         <form onSubmit={handleSubmit} action="/signup" method="POST" >
          <label htmlFor="pseudo">Pseudo : </label> < br/><Input className="input" id="pseudo" name="pseudo" placeholder="Enter your pseudo" onChange={handleChange} value={formState.pseudo} required></Input> <br/>
          <label htmlFor="mail">E-mail : </label> < br/><Input className="input" id="mail" name="mail" placeholder="Enter your e-mail" onChange={handleChange} value={formState.mail} required></Input> <br/>
          <label htmlFor="password"> Password : </label> < br/><Input onKeyUp={confirmPassword} className="input" id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={formState.password} required></Input><i id="eye" onClick={toggle} className="fa fa-eye " aria-hidden="true"></i> < br/>
          <label htmlFor="confirm_password"> Confirm Password : </label> < br/><Input onKeyUp={confirmPassword} className="input" id="confirm_password" name="confirm_password" type="password" placeholder="Confirm password"  required></Input> < br/><br/>
          <Button htmlType="submit" >Submit</Button>
          < br/>
          { validateMail  ? " " : result[0]} { validatePassword  ? " " : result[2]} <p>  
            <Link to="/login">Have an account ?</Link>
          </p>
        </form>
        
        </div>

    )
    
} 

export default Signup;