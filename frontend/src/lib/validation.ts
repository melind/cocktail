
import validate from 'validate.js';

const displayError = (props) => {
    const constraints = {
           mail: {
             presence: true,
             format: {
               pattern: /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
               message: ": Format invalide"
             }
           },
           password: {
             presence: true,
             length: {
               minimum: 8,
               message: ": Doit contenir au moins 8 caractères"
             }
           },
           pseudo: {
             presence: true,
             length: {
              minimum: 1000,
              message: ": "
            }
           }
       };
       //result = undefined if input is empty so let error for pseudo
       const result = validate(props, constraints);
       if (result)
       console.log("result: ",result);
   
      return [result.mail, " ", result.password];
  } 
  
  export default displayError;