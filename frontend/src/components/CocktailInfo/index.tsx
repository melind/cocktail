import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import { Card, Col, Row, Image, Spin  } from 'antd';

const CocktailInfo = (props) => {
    

    const [cocktail, setCocktail] = useState([]);
    const [loading, setLoading] = useState(true);

    let cocktailName = props.match.params.cocktail_name; 
    
    async function cocktailDetails() {  

       const details = await cocktailAPI.cocktailInfo(cocktailName)
       .then(res => {
           return res.data.cocktail.drinks[0];
           
           
       })
       .catch(err => {
          
       });
       setCocktail(details);
       setLoading(false);
       
       }
   
       useEffect(() => {
       cocktailDetails();
       }, []); 
       let ingredient = [];
       let quantity = [];
       let image = [];
       //let ingredients = [];
       let number_ingredient = 1;
       for (number_ingredient = 1; number_ingredient < 16; number_ingredient++) {
                           
           if (cocktail[`strIngredient${number_ingredient}`] != null) {
             //ingredients.push([cocktail[`strIngredient${number_ingredient}`]], [cocktail[`strMeasure${number_ingredient}`] ]);
                   ingredient.push(cocktail[`strIngredient${number_ingredient}`])
                   quantity.push(cocktail[`strMeasure${number_ingredient}`]);
            }
         }

    return (
        <div className="cocktailInfo screen">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div >
                   
                          {loading ?      
                          
                             (<div className="spin"><Spin size="large" /></div>)
                            
                              :
                             ( <Card title={ cocktail['strDrink'] } >
                      
                                <Image className="cocktailInfo_image"
                                      
                                      src={cocktail['strDrinkThumb']} alt="cocktail"
                                    />

                             </Card >
                              )}
                             <Row gutter={4}>
                                    <Col span={8}>
                                      <Card title="Ingredients" bordered={false}>
                                       {ingredient.map((result) => 
                                        <p>{result}</p> )}
                                      </Card>
                                    </Col>

                                    <Col span={8}>
                                      <Card title="Quantity" bordered={false}>
                                         {quantity.map((result) => 
                                        <p>{result}</p> )}
                                      </Card>
                                    </Col>

                                    <Col span={8}>
                                      <Card title="images" bordered={false}>
                                        {ingredient.map((result) => 
                                         <Image.PreviewGroup >
                                         
                                                <Image
                                                  className="cocktailInfo_image_ingredient"
                                                  src={`https://www.thecocktaildb.com/images/ingredients/${result}.png`} alt="liquor"
                                                />

                                            </Image.PreviewGroup>
                                        )}
                                      </Card>
                                    </Col>
                               </Row>
                           
                    

                 </div>
                
                               
        </div>
        
        </div>
    )
}
export default CocktailInfo;