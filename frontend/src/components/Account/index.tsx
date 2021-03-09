import React, { useState} from 'react';
import { Redirect, Link  } from 'react-router-dom';
import userAPI from '../../services/userAPI';
import { Tabs, Popconfirm, message } from 'antd';
import './index.css';


 

const Account = ({display, pseudo, mail, password, date, onClick, init}) => {

display();
const URL = process.env.REACT_APP_URL;
date = date.slice(0, 10);


const handleDelete = () => {
  
        onClick();
        message.success('Suppression réussie !');
        setTimeout(function () {
           userAPI.logOut();
           userAPI.logout();
           window.location.replace(URL||"http://localhost:3000/home");
         }, 1000);
}

const handleInit = () => {
    init();
}




    return (
        <div className="account"> 
        
           
            <div className="count"> 
                 < h1>    My Account </h1>
            </div>

             Pseudo: {pseudo} < br/> 
             email: {mail} < br/>
             sign up since: {date} < br/>< br/> < br/> 

            <Link to="/update-pseudo" onClick={handleInit}>Set pseudo</Link> < br/>
            <Link to="/update-mail" onClick={handleInit}>Set your mail</Link> < br/>
            <Link to="/update-password" onClick={handleInit}>Set your password</Link>< br/>
            < br/>< br/>
       
            <Popconfirm
                title="Delete account ?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                className="popconfirm"
            >


               <a href="#" rel="noreferrer"> Delete account</a>
             </Popconfirm>

        </div>
    )
}

export default Account;