import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import  displayError  from '../../lib/validationMail';
import {Input} from 'antd';
// component = function return element to display
const Mail = ({mail,  error, onSubmit, init}) => {
    const URL_ACCOUNT = process.env.REACT_APP_URL_ACCOUNT;

    init();



    const [formState, setFormState] = useState({mail});
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
   

    return (

        <div className="setAccount form">
        <h1>Set your e-mail</h1>
        <Link to="/account" className="return"> Back </Link>
         <form onSubmit={handleSubmit} action="/update-mail" method="POST" >
          <Input className="input" name="mail" placeholder="Enter votre mail" onChange={handleChange} value={formState.mail} required></Input>
         
          <button type="submit" >Submit</button>

          <p> {result}  {error}</p>
        </form>
        
        </div>

    )
    
} 

export default Mail;