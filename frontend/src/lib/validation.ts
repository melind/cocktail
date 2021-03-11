
import validate from 'validate.js';

const displayError = (props) => {
    const constraints = {
           mail: {
             presence: true,
             format: {
               pattern: /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
               message: ": Format invalid"
             }
           },
           password: {
             presence: true,
             length: {
               minimum: 8,
               message: ": Password must have at least 8 characters"
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
       
   
      return [result.mail, " ", result.password];
  } 
  
  export default displayError;