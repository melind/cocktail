import validate from 'validate.js';

const displayError = (props) => {
    const constraints = {
           password: {
             presence: true,
             length: {
               minimum: 8,
               message: ": Doit contenir 8 caractères"
             }
           }, 
           pseudo: {
             presence: true,
             length: {
              minimum: 1000,
              message: ": Doit contenir 8 caractères"
            }
           }
       };
       //result = undefined if input is empty so let error for pseudo
       const result = validate(props, constraints);
       if (result)
       console.log("result: ",result);
   
      return [result.password];
  } 
  
  export default displayError;