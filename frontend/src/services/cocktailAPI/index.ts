import axios from 'axios';
import qs from 'qs';
const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
};

const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL: ",API_URL);

export default { 

    cocktailInfo: (cocktail_name) => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + `/cocktail/${cocktail_name}`)
        },
    
    cocktailRandom: () => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + '/home')
        },

    cocktailsA: () => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + '/cocktails_alcoholic')
        },    
    cocktailsByIngredient: (ingredient) => {
        axios.defaults.withCredentials = false;
        return axios.get( API_URL + `/cocktails_by_ingredient/${ingredient}`)
        },
    cocktailsNA: () => {
       axios.defaults.withCredentials = true;
       return axios.get( API_URL + '/cocktails_non_alcoholic')
       },  
/*
    search: (search) => {
     axios.defaults.withCredentials = true;
     return axios.post( API_URL + '/home', qs.stringify(search),{headers: headers})
    
     }, */
}