import {Request, Response, NextFunction} from 'express';

import * as jsonwebtoken from 'jsonwebtoken';
export default function (request: Request, response: Response, next: NextFunction) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/','/login','/signup'].includes(request.url) ) {
    next();
  } else {
    
    const token: any = request.cookies.jwt;
    const csrf: any = request.session.csrf;
  
    
    try {
      const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
    
        if ((decodedToken.admin === true ) && csrf) {
        
        
        
        next();
      } else {
        
        response.status(403).end();
      }
    } catch (error) {
      
      response.status(403).end();
    }
    
  }
}