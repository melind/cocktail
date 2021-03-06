import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';

const CocktailsAlcoholic = () => {
    
    const [cocktails, setCocktails] = useState([]);

     async function cocktailsList() { 
         const cocktailsInfo = await cocktailAPI.cocktailsA()
         .then(res => {
          console.log("al",res.data.cocktail)
             return res.data.cocktails;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setCocktails(cocktailsInfo);
     
     }

      useEffect(() => {
       cocktailsList();
       }, []); 

    return (
        <div className="cocktail">
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
export default CocktailsAlcoholic;