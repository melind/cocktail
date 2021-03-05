import axios from 'axios';
import qs from 'qs';
const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
};

const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL: ",API_URL);

export default { 

    todayEvents: (location) => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + `/${location}/today`)
        },

    weekEvents: (location) => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + `/${location}/week`)
        },    

    eventInfo: (eventName,idEvent) => {
       axios.defaults.withCredentials = true;
       return axios.get( API_URL + `/description/${eventName}/${idEvent}`)
       },  
/*
    search: (search) => {
     axios.defaults.withCredentials = true;
     return axios.post( API_URL + '/home', qs.stringify(search),{headers: headers})
    
     }, */
}