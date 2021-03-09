import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import { Card, Image, BackTop } from 'antd';

const CocktailsByIngredient = (props) => {
    

    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);

    let ingredient = props.match.params.ingredient; 
    
    async function cocktailsList() {  

       const list = await cocktailAPI.cocktailsByIngredient(ingredient)
       .then(res => {
           
           return res.data.cocktails;
           
       })
       .catch(err => {
         return err
       });
       setCocktails(list);
       setLoading(false);
       
       }
   
       useEffect(() => {
       cocktailsList();
       }, []); 
       
      

        const { Meta } = Card;
      
    return (
        <div className="cocktailsByIngredient screen">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div > 
         
                    
                   
                    <Card title=""  loading={loading}>
                          {cocktails['drinks'] && cocktails['drinks'].map((result) =>

                     
                          <Card.Grid   className="grid" key={result.idDrink}>
                                 <Link  to={`/cocktail/${result.strDrink}`} target="_parent" key={result.idDrink}>
                                      <p>{result.strDrink}</p>
                                 </Link>
                            <Image
                              className="grid_image"
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
        
        </div>
    )
}
export default CocktailsByIngredient;