import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import userAPI from '../../services/userAPI';
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


    const handleDelete = () => {
    
       // userAPI.deleteOtherUser();
    
}
        useEffect(() => {
            usersList();
            
            }, []); 
     

            
            if(users === undefined) {
                return <Redirect to="/forbidden" />;
            }
 
            
    return (
        <div className="admin">
            <h1>Hello admin !</h1> <br/><br/> 
            <p>Liste des abonnés</p>
             <ul>{users.map((result) => <Link to="/admin" key={result._id} onClick={handleDelete}  >
                 <li key={result._id}>{result.pseudo} </li></Link>)}
            </ul>
            <Link to="/home"> Accueil </Link>
        </div>
    )
}

export default Admin;