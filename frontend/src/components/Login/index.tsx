import React, { useState} from 'react';
import { Link} from 'react-router-dom';
import {Button, Input} from 'antd';
import userAPI from '../../services/userAPI';
//import './index.css';

const Login = ({pseudo, password, onSubmit, loggedin, error, init}) => {

 
 setTimeout(function () {
    init();
  }, 1000);

  const URL = process.env.REACT_APP_URL;
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
      window.location.replace(URL||"http://localhost:3000/home");
    }, 1000);
   }
     
     
    return (

        <div className="form"> 

        <h1>Login</h1>< br/>
        
        <form onSubmit={handleSubmit} action="/login" >
        <label htmlFor="pseudo">Pseudo :  </label><Input className="input" id="pseudo" name="pseudo" placeholder="Entrer votre pseudo" onChange={handleChange} value={formState.pseudo} required></Input> < br/>< br/>
        <label htmlFor="password">password : </label><Input className="input" id="password" name="password" type="password" placeholder="Entrer votre mot de passe" onChange={handleChange} value={formState.password} required></Input> < br/>< br/>< br/>
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