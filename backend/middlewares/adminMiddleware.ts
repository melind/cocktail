import {Request, Response, NextFunction} from 'express';

import * as jsonwebtoken from 'jsonwebtoken';
export default function (request: Request, response: Response, next: NextFunction) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/admin'].includes(request.url) ) {
       const token: any = request.cookies.jwt;
       // @ts-ignore
       const csrf: any = request.session.csrf; console.log("ad",token,csrf);
 
    
  
    
    try {
      // @ts-ignore
      const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
    // @ts-ignore
        if ((decodedToken.mail === process.env.MAIL ) && csrf) {
        console.log(process.env.MAIL)
         // @ts-ignore
        console.log("ad",token,csrf);
        next();
      } else {
        
        response.status(403).end();
      }
    } catch (error) {
      
      response.status(403).end();
    }
    
  }
    else {
       response.status(403).end();
    }
}