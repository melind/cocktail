import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';

import './index.css';

const Home = () => {

    const [cocktail, setCocktail] = useState([]);

    async function cocktailRandom() {  

        const randomCocktail = await cocktailAPI.cocktailRandom()
        .then(res => { 
            return res.data.cocktail.drinks[0];
            
        })
        .catch(err => {
           return err
        });
        setCocktail(randomCocktail);
        
        }
    
        useEffect(() => {
        cocktailRandom();
        }, []); 
     


    return (
        <div className="home">
             { cocktail['strDrink'] } <img src={`${cocktail['strDrinkThumb']}`} /> {cocktail['strInstructions']} {cocktail['strIngredient1']}
                   
                    
          
        <h1> welcome </h1>
         <p>Duis ac commodo nisi, elementum varius lectus. Curabitur molestie rutrum augue nec finibus. Aliquam erat volutpat. Sed tristique faucibus turpis ut mattis. Suspendisse potenti. Ut in ex libero. Vivamus sagittis, erat et hendrerit hendrerit, mi elit consectetur mauris, id elementum odio diam nec odio. Nulla bibendum, nisl eget commodo convallis, augue diam fermentum lacus, ac laoreet purus justo eu dolor. Aliquam erat volutpat. In a imperdiet nunc. Aenean ultricies nisi eget lorem pretium, aliquet pellentesque est dictum. Aliquam massa felis, faucibus sit amet libero sit amet, efficitur sollicitudin lorem. Phasellus vitae orci vel lectus convallis tempor sit amet sit amet nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
       </div>
        
    )
}
export default Home;