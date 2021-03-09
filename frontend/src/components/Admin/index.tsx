import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import userAPI from '../../services/userAPI';
import { Tabs, Popconfirm, message, Button } from 'antd';
import './index.css';

const Admin = () => {

    const [users, setUsers] = useState([]);
    async function usersList() { 
        const list = await userAPI.isAdmin()
        .then(res => {
           
                   
            return res.data.users;
            
        })
        .catch(err => {

            
        });

        setUsers(list);
    }


   const handleDelete = (user) => {
            
          
            userAPI.deleteOtherUser(user);
            message.success('Suppression réussie !');
            setTimeout(function () {
                document.location.reload();
         }, 1000);
}
        useEffect(() => {
            usersList();
            
            }, []); 
     

            
          
            
    return (
        <div className="admin">
            <h1>Hello admin !</h1> <br/><br/> 
            <p>Liste des abonnés</p>
             <ul>{users.map((result) => 
                 <li key={result._id}>{result.pseudo} delete account 
                  <Popconfirm
                        title="Delete account ?"
                        onConfirm={() => handleDelete(result.pseudo)}
                        okText="Yes"
                        cancelText="No"
                        className="popconfirm">
                         <br/><a href="#" rel="noreferrer"> DELETE</a>
                 </Popconfirm> </li>
              
                 )}
            </ul>
        
        </div>
    )
}

export default Admin;