import React, { useState, useEffect } from 'react';
import cocktailAPI from '../../services/cocktailAPI';

const CocktailInfo = (props) => {
    

    const [cocktail, setCocktail] = useState([]);

    let cocktailName = props.match.params.cocktail_name; 
    
    async function cocktailDetails() {  

       const details = await cocktailAPI.cocktailInfo(cocktailName)
       .then(res => {
           return res.data.cocktail.drinks[0];
           
           
       })
       .catch(err => {
          
       });
       setCocktail(details);
       
       }
   
       useEffect(() => {
       cocktailDetails();
       }, []); 
       let ingredients = [];
let number_ingredient = 1;
for (number_ingredient = 1; number_ingredient < 16; number_ingredient++) {
                    
    if (cocktail[`strIngredient${number_ingredient}`] != null) {
      ingredients.push([cocktail[`strIngredient${number_ingredient}`]], [cocktail[`strMeasure${number_ingredient}`] ])
            }
  }

    return (
        <div className="cocktailInfo">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div >
                    { cocktail['strDrink'] } <img src={`${cocktail['strDrinkThumb']}`} /> {cocktail['strInstructions']} 
                
                
                        {ingredients.map((result) =>
                        <div key={result.id}> 
                               {result}
                               </div>
                        )} 
            
             
             
                    

                 </div>
                
                               
        </div>
        
        </div>
    )
}
export default CocktailInfo;