import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import  displayError  from '../../lib/validationMail';
import {Input, Button} from 'antd';
// component = function return element to display

const ForgetPassword = ({mail,  error, onSubmit, init}) => {



    init();


 
  const [formState, setFormState] = useState({mail});
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
        }
        
    }
   
     
     
    return (

        <div className="form"> 

        <h1>Reset Password</h1>< br/>
        Enter your email
        <form onSubmit={handleSubmit} action="/reset-password" method="POST" >
          <Input className="input" name="mail" placeholder="Enter votre mail" onChange={handleChange} value={formState.mail} required></Input>
         
          <button type="submit" >Send</button>

         

          <p>  {result} {error}</p>
        </form>
        
        </div>

    )
    
}

export default ForgetPassword;