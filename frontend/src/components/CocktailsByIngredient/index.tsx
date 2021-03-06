import React, { useState, useEffect } from 'react';
import cocktailAPI from '../../services/cocktailAPI';

const cocktailsByIngredient = (props) => {
    

    const [cocktails, setCocktails] = useState([]);

    let ingredient = props.match.params.ingredient; 
    
    async function cocktailsList() {  

       const list = await cocktailAPI.cocktailsByIngredient(ingredient)
       .then(res => {
           return res.data.cocktails;
           
       })
       .catch(err => {
          err
       });
       setCocktails(list);
       
       }
   
       useEffect(() => {
       cocktailsList();
       }, []); 

    return (
        <div className="cocktailsByIngredient">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div > 
         
                    
                    {cocktails['drinks'] && cocktails['drinks'].map((result) => <div key={result.idDrink}> <a href={`/cocktail/${result.strDrink}`} target="_blank">{result.strDrink}</a><img src={`${result.strDrinkThumb}`} /></div>)}
                    

                 </div>
                
                               
        </div>
        
        </div>
    )
}
export default cocktailsByIngredient;