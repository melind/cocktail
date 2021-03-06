import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';

const CocktailsNonAlcoholic = () => {

    const [cocktails, setcocktails] = useState([]);

     async function cocktailsList() { 
         const cocktailsInfo = await cocktailAPI.cocktailsNA()
         .then(res => {
            
             return res.data.cocktails;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setcocktails(cocktailsInfo);
     
     }

      useEffect(() => {
       cocktailsList();
       }, []); 

    return (
        <div className="cocktails">

        <div>
                {cocktails['drinks'] && cocktails['drinks'].map((result) =>
                 <div key={result.idDrink}> 
                     {result.strDrink}
                     <img src={`${result.strDrinkThumb}`} />
                     <Link to={`/cocktail/${result.strDrink}`}>Plus d'info</Link>

                 </div>
                 )} 
                               
        </div>
        
        </div>
    )
}
export default CocktailsNonAlcoholic;