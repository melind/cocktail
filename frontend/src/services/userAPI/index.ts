  
import axios from 'axios';
import qs from 'qs';
//import cookie from 'react-cookies';
const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
};


const API_URL = process.env.REACT_APP_API_URL;


export default {

    deleteUser: () => { 
        axios.defaults.withCredentials = true;
        return axios.delete( API_URL + '/delete-account', {headers: headers})
    },
     deleteOtherUser: (user) => { 
        axios.defaults.withCredentials = true;
        return axios.delete( API_URL + `/delete-other-account/${user}`, {headers: headers})
    },
    infoUser: () => { 
        axios.defaults.withCredentials = true;
        return axios.get( API_URL + '/account')
    }, 

    isAdmin: () => { 
        axios.defaults.withCredentials = true;
        return  axios.get( API_URL + '/admin')
    },

    isAuth: () => {
         if (localStorage.getItem('login')) {
         return true;
        }
         return false;
    },

    login: () => {
        localStorage.setItem('login', 'Login');
    },

    logout: () => {
       localStorage.removeItem('login');
    },
    
    loginUser: (formState) => { 
        axios.defaults.withCredentials = true;
        return axios.post( API_URL + '/login', qs.stringify(formState), {headers: headers})
        },
    
    logOut: () => { 
        axios.defaults.withCredentials = true;
        return axios.get( API_URL + '/logout')
    },

    newPassword: (formState) => { 
        // @ts-ignore
        return axios.post( API_URL + '/new-password/:passwordResetToken', qs.stringify(formState))
        },
        
    pseudoUser: () => { 
        axios.defaults.withCredentials = true;
        return axios.get( API_URL + '/')
    }, 
    resendToken: (formState) => {
        // @ts-ignore 
        return axios.post( API_URL + '/resend', qs.stringify(formState))
    },
    resetPassword: (formState) => {
        // @ts-ignore 
        return axios.post( API_URL + '/reset-password', qs.stringify(formState))
    },

    signupUser: (formState) => {
        return axios.post( API_URL + '/signup', qs.stringify(formState), {headers: headers})
    },
   
    updateMail: (formState) => { 
        axios.defaults.withCredentials = true;
        return axios.put( API_URL + '/update-mail', qs.stringify(formState), {headers: headers})
    },

    updatePseudo: (formState) => { 
        axios.defaults.withCredentials = true;
        return axios.put( API_URL + '/update-user-name', qs.stringify(formState), {headers: headers})
    }, 

    updatePassword: (formState) => { 
        axios.defaults.withCredentials = true;
        return axios.put( API_URL + '/update-password', qs.stringify(formState), {headers: headers})
    }

}