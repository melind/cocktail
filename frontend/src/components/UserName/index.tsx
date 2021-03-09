import React, { useState } from 'react';
//import './index.css';
import { Link } from 'react-router-dom';
import {Input} from 'antd';
// component = function return element to display
const UserName = ({pseudo, update, error, onSubmit, init}) => {
    const URL_ACCOUNT = process.env.REACT_APP_URL_ACCOUNT;
    init();

   

    const [formState, setFormState] = useState({pseudo});
    const handleChange = (e) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        
        setFormState({...formState, [name]: value}); // name_input : input_value
        
       
            
    }
 

 const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmit(formState); 
        window.location.replace(URL_ACCOUNT||"http://localhost:3000/account");
    }

           
     
   

    return (

        <div className="setAccount form" >
        <h1>Modifier votre pseudo</h1>
        <Link to="/account" className="return">  Back </Link>
         <form onSubmit={handleSubmit} action="/update-pseudo" method="POST" >
          <Input className="input" name="pseudo" placeholder="Entrer votre pseudo" onChange={handleChange} value={formState.pseudo} required></Input>
         
          <button  type="submit" >Submit</button>

          <p> {error}</p>

        </form>
        
        </div>

    )
    
} 

export default UserName;