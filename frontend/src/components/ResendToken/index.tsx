import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import  displayError  from '../../lib/validationMail';
import {Input} from 'antd';
// component = function return element to display
const ResendToken = ({mail,  error, onSubmit, init}) => {

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

        <div className="setAccount form">
        <h1>Enter your e-mail</h1>
        <Link to="/account" className="return"> Back </Link>
         <form onSubmit={handleSubmit} action="/update-mail" method="POST" >
          <Input className="input" name="mail" placeholder="Enter votre mail" onChange={handleChange} value={formState.mail} required></Input>
         
          <button type="submit" >Submit</button>

          <p> {result}  {error}</p>
        </form>
        
        </div>

    )
    
} 

export default ResendToken;