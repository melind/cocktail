import validate from 'validate.js';

const displayError = (props) => {
    const constraints = {
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
              message: ": Password must have at least 8 characters"
            }
           }
       };
       //result = undefined if input is empty so let error for pseudo
       const result = validate(props, constraints);
       if (result)
       
   
      return [result.password];
  } 
  
  export default displayError;