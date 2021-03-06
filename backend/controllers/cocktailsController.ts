import {Request, Response} from 'express';
import axios from 'axios';
import  htmlspecialchars from 'htmlspecialchars';
export default class cocktailsController {
 



    static async cocktail(request: Request, response: Response) {

            try{ 

        let cocktail_name = request.params.cocktail_name;
        cocktail_name = htmlspecialchars(cocktail_name);
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //cocktail of the day
        const cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/search.php?s=${cocktail_name}`;
       
       /* -------------get data of the external api---------*/
        const cocktail = await axios.get(cocktailUrl)
            .then((res) =>{ return res.data})
            .catch(err => { return err});
        

        response.status(200).json({
                                    cocktail
                                   });
                                } catch (err) {
                                    return  err
                                 }
           
        
          
    }
 
    static async cocktailsSearchByIngredient(request: Request, response: Response) {
        
        try { 

        let ingredient = request.params.ingredient;
        ingredient = htmlspecialchars(ingredient);
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //cocktail of the day
        const cocktailsUrl = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?i=${ingredient}`
       
       /* -------------get data of the external api---------*/
        const cocktails = await axios.get(cocktailsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { return err});
        

        response.status(200).json({
                                    cocktails
                                   });

                                } catch (err) {
                                   return  err
                                }
          
    }

      static async cocktailsRandom(request: Request, response: Response) {

         try { 

            const API_KEY = process.env.API_KEY 
 /*--------------get api key and the url of the  external api -------------------*/
            
            const cocktailsRandomUrl = `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/random.php`;
            
       /* -------------get data of the external api---------*/
            const cocktail = await axios.get(cocktailsRandomUrl)
                .then((res) =>{ return res.data})
                .catch(err => { return err});
            

            response.status(200).json({
                                        cocktail
                                       });

                                    } catch (err) {
                                        return  err
                                     }
                                 
                                 
          
    }

       static async cocktailsAlcoholic(request: Request, response: Response) {

          try{ 

            const API_KEY = process.env.API_KEY

            
    /*--------------get api key and the url of the  external api -------------------*/

            
            const cocktailsUrl =  `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?a=Alcoholic`
           /* -------------get data of the external api---------*/
            
            const cocktails = await axios.get(cocktailsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { return err });
            
            
            response.status(200).json({
                                        cocktails
                                       });
                                   
                                    } catch (err) {
                                        return  err
                                     }
           
      
    }

    static async cocktailsNonAlcoholic(request: Request, response: Response) {

        try { 
            const API_KEY = process.env.API_KEY

            
    /*--------------get api key and the url of the  external api -------------------*/

            
            const cocktailsUrl =  `https://www.thecocktaildb.com/api/json/v1/${API_KEY}/filter.php?a=Non_Alcoholic`
           /* -------------get data of the external api---------*/
            
            const cocktails = await axios.get(cocktailsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { return err });
            
            
            response.status(200).json({
                                        cocktails
                                       });
                                   
                                    } catch (err) {
                                        return  err
                                     }
           
      
    }

}