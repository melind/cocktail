import React, { useState } from 'react';
//import './index.css';
import { Redirect, Link } from 'react-router-dom';
import  displayError  from '../../lib/validationPassword';
import {Input} from 'antd';
// component = function return element to display
const Password = ({password, error, onSubmit, init}) => {
    const URL_ACCOUNT = process.env.REACT_APP_URL_ACCOUNT;
    init();

    console.log("states come from update:", password, error);

    const [formState, setFormState] = useState({password});
    const handleChange = (e) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        
        setFormState({...formState, [name]: value}); // name_input : input_value
        
     
            
    }

   const result = displayError(formState); 

 const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!result[0]) { 
          onSubmit(formState);
           window.location.replace(URL_ACCOUNT||"http://localhost:3000/account");
        }
      
       
   
    }
     
   

    return (

        <div className="setAccount form">
        <h1>Set your password</h1>
        <Link to="/account" className="return"> Back </Link>
         <form onSubmit={handleSubmit} action="/update-password" method="POST" >
          <Input className="input" name="password" type="password" placeholder="Entrer votre password" onChange={handleChange} value={formState.password} required></Input>
         
          <button type="submit"  >Submit</button>

          <p>  {result} {error}</p>
        </form>
       
        </div>

    )
    
} 

export default Password;