"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

exports.__esModule = true;
var  axios = require (  'axios');
var   htmlspecialchars = require (  'htmlspecialchars');

 class cocktailsController {
 



    static async cocktail(request, response) {

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
 
    static async cocktailsSearchByIngredient(request, response) {
        
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

      static async cocktailsRandom(request, response) {

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

       static async cocktailsAlcoholic(request, response) {

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

    static async cocktailsNonAlcoholic(request, response) {

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
exports["default"] = cocktailsController;