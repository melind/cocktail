import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import { Card, BackTop, Image } from 'antd';
import './index.css';
const CocktailsAlcoholic = () => {
    
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

     async function cocktailsList() { 
         const cocktailsInfo = await cocktailAPI.cocktailsA()
         .then(res => {
         
             return res.data.cocktails;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setCocktails(cocktailsInfo);
         setLoading(false);
     
     }

      useEffect(() => {
       cocktailsList();
       }, []); 

       
        const { Meta } = Card;
      
        

    return (
        <div className="cocktailInfo screen">
            
               <div>
              
                    <Card   loading={loading}>
                          {cocktails['drinks'] && cocktails['drinks'].map((result) =>

                     
                          <Card.Grid className="grid"  key={result.idDrink}>
                         
                           <Link   to={`/cocktail/${result.strDrink}`} target="_parent" key={result.idDrink}>
                                      <p>{result.strDrink}</p>
                           </Link>
                            <Image  className="grid_name"
                              
                              src={`${result.strDrinkThumb}`} alt="cocktail"
                            />
                          </Card.Grid>

                      )} 
                    </Card>  
                                     
                 </div>

                   <BackTop>
                     <div className="up">UP</div>
                   </BackTop>
        </div>
    )
}
export default CocktailsAlcoholic;