import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import { Card,  Image, BackTop } from 'antd';

const CocktailsNonAlcoholic = () => {

    const [cocktails, setcocktails] = useState([]);
    const [loading, setLoading] = useState(true);

     async function cocktailsList() { 
         const cocktailsInfo = await cocktailAPI.cocktailsNA()
         .then(res => {
            
             return res.data.cocktails;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setcocktails(cocktailsInfo);
         setLoading(false);
     
     }

      useEffect(() => {
       cocktailsList();
       }, []); 

       
      

    return (
        <div className="cocktails screen">

        <div>
                <Card  className="card" loading={loading}>
                          {cocktails['drinks'] && cocktails['drinks'].map((result) =>

                     
                          <Card.Grid  className="grid" key={result.idDrink}>
                           
                            <Link  to={`/cocktail/${result.strDrink}`} target="_parent" key={result.idDrink}>
                                      <p>{result.strDrink}</p>
                            </Link>
                            <Image className="grid_image"
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
export default CocktailsNonAlcoholic;