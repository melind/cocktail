import React, { useState} from 'react';
import { Redirect, Link  } from 'react-router-dom';
import userAPI from '../../services/userAPI';
import { Tabs, Popconfirm, message } from 'antd';
import './index.css';


 

const Account = ({display, pseudo, mail, password, date, onClick, init}) => {

display();

date = date.slice(0, 10);


const handleDelete = () => {
  
        onClick();
        message.success('Suppression réussie !');
 
}

const handleInit = () => {
    init();
}

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

//if(!subscriber) { return <Redirect to="/" />}

    return (
        <div className="account"> 
        
            <div className="separator"></div>
            <div className="count"> 
            < h1>    Mon compte </h1>
             <Tabs onChange={callback} >
                 <TabPane tab="Tab 1" key="1">
                   Content of Tab Pane 1
                 </TabPane>
                 <TabPane tab="Tab 2" key="2">
                   Content of Tab Pane 2
                 </TabPane>
             </Tabs>     
       
       
            </div>

             Pseudo: {pseudo} < br/> 
        adresse mail: {mail} < br/>
        Date d'inscription: {date} < br/>< br/> < br/> 
          
        <Link to="/mise-a-jour-pseudo" onClick={handleInit}>Modifier votre pseudo</Link> < br/>
        <Link to="/mise-a-jour-pseudo" onClick={handleInit}>Modifier votre adresse mail</Link> < br/>
        <Link to="/mise-a-jour-mot-de-passe" onClick={handleInit}>Modifier votre mot de passe</Link>< br/>
        <Link to="/"> Accueil </Link>< br/>< br/>
       
        <Popconfirm
            title="Voulez vous vraiment nous quitter ?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            className="popconfirm"
        >
            
            <img src="https://media.giphy.com/media/dyJ9XHstowFRC/giphy.gif" alt="gif d'un bonhomme de lumière allant vers la sortie"/>
            Désinscription
         </Popconfirm>

        </div>
    )
}

export default Account;