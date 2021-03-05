import React, { useState} from 'react';
import { Redirect, Link} from 'react-router-dom';
import {Button, Input} from 'antd';
//import './index.css';

const ForgetPassword = ({mail, error, onSubmit, init}) => {


 setTimeout(function () {
    init();
  }, 1000);

 
  const [formState, setFormState] = useState({mail});
 
 
  const handleChange = (e) => {
      const name: string = e.target.mail;
      const value: string = e.target.value;
      setFormState({...formState, [name]: value}); // name_input : input_value
      
      
    
  }
  const handleSubmit = (e) => {
        e.preventDefault();
    
        onSubmit(formState);
        
        
    }
   
     
     
    return (

        <div className="form"> 

        <h1>Réinitialisation de votre mot de passe</h1>< br/>
        inscrivez votre mail
        <form onSubmit={handleSubmit} action="/resetPassword" method="POST" >
          <Input className="input" name="mail" placeholder="Entrer votre mail" onChange={handleChange} value={formState.mail} required></Input>
         
          <button type="submit" >envoyé</button>

          <Link to="/connectez-vous">Pas encore inscrit ?</Link>

          <p>   {error}</p>
        </form>
        
        </div>

    )
    
}

export default ForgetPassword;