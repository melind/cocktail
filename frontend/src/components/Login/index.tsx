import React, { useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import {Button, Input} from 'antd';
import userAPI from '../../services/userAPI';
//import './index.css';

const Login = ({pseudo, password, onSubmit, loggedin, error, init}) => {

 

  const URL = process.env.REACT_APP_URL_HOME;
  const [formState, setFormState] = useState({pseudo, password, loggedin});
 
 
  const handleChange = (e) => {
      const name: string = e.target.name;
      const value: string = e.target.value;
      setFormState({...formState, [name]: value}); // name_input : input_value
    
  }

  const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
        
    }
   if(loggedin) {
     //create local.sotorage
     userAPI.login();
     setTimeout(function () {
      window.location.replace(URL);
    }, 1000);
   }

   let password_input = document.getElementById("password") as HTMLInputElement;
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

        <div className="form"> 

        <h1>Login</h1>< br/>
        
        <form onSubmit={handleSubmit} action="/login" >
        <label htmlFor="pseudo">Pseudo :  </label>< br/><Input className="input" id="pseudo" name="pseudo" placeholder="Entrer votre pseudo" onChange={handleChange} value={formState.pseudo} required></Input> < br/>< br/>
        <label htmlFor="password">password : </label>< br/><Input className="input" id="password" name="password" type="password" placeholder="Entrer votre mot de passe" onChange={handleChange} value={formState.password} required></Input><i id="eye" onClick={toggle} className="fa fa-eye " aria-hidden="true"></i> < br/>< br/>< br/>
          <Button  htmlType="submit" >Submit</Button>
          <p>{error}<br/>  
            <Link to="/signup">Not already signed up ? </Link>
            <Link to="/forget-passord">forgot password ? </Link>
            <Link to="/resend-email">resend confirmation email ? </Link>
            
          </p> 
        </form>
        
        </div>

    )
    
}

export default Login;