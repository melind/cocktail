import {Request, Response, NextFunction} from 'express';

import * as jsonwebtoken from 'jsonwebtoken';
export default function (request: Request, response: Response, next: NextFunction) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/account','/update-mail','/update-password', 'update-user-name','/logout'].includes(request.url) ) {
    const token: any = request.cookies.jwt;
     // @ts-ignore
    const csrf: any = request.session.csrf;
    
  } else {

    next();
    
    try {
       // @ts-ignore
      const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
         // @ts-ignore
        if (decodedToken && csrf) {
        

        next();
      } else {
        response.status(401).end();
      }
    } catch (error) {
      
      response.clearCookie('jwt');
      response.status(401).end();
    }
    
  }
}