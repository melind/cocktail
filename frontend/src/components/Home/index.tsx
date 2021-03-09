import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import cocktailAPI from '../../services/cocktailAPI';
import {Carousel, Image, Card, Spin, Space} from 'antd';
import './index.css';

const Home = () => {

    const [cocktail, setCocktail] = useState([]);
    const [loading, setLoading] = useState(true);

    async function cocktailRandom() {  

        const randomCocktail = await cocktailAPI.cocktailRandom()
        .then(res => { 
            return res.data.cocktail.drinks[0];
            
        })
        .catch(err => {
           return err
        });
        setCocktail(randomCocktail);
        setLoading(false);
        }
    
        useEffect(() => {
        cocktailRandom();
        }, []); 
     

    return (
        <div className="home screen">
          {loading ? 
                 (<div className="spin">
                 <Space size="middle">
                     <Spin size="small" />
                     <Spin />
                     <Spin size="large" />
                  </Space>
                  </div>) 
                  :
                   (<Carousel effect='fade'  beforeChange={cocktailRandom} autoplay dots={false}  >
                        <div>
                            
                                <Link   to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                              
                           
         
                      </div>
                      <div>
                                <Link  to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                             
         
                      </div>
   
                      <div>
                                <Link   to={`/cocktail/${ cocktail['strDrink'] }`} target="_parent" >
                                         <p>{ cocktail['strDrink'] } </p>
                                </Link>
                                <Image
                                         width={300}
                                         src={`${cocktail['strDrinkThumb']}`}  alt="cocktail"
                                       />
                             
         
                      </div>
                      
                </Carousel>)}
          
               <h1> A Cocktail ?!</h1>
                  
                  <p>You're looking for a cocktail ? Want some inspiration ? You got  ingredients and do know what to do with ?
                    This website is for you !
                  </p>
       </div>
        
    )
}
export default Home;