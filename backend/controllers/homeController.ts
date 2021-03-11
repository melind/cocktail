import {Request, Response} from 'express';
import {User, IUser} from '../models/user';
import * as jsonwebtoken from 'jsonwebtoken';

export default class homeController {

 static async pseudoUser(request: Request, response: Response) {

           //get info in thejwt
           const token: any = request.cookies.jwt;
           if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      });
           } 
           if(token){ 

              const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
              const pseudo = decodedToken.nickname;

            
                 response.status(200).json({
                                         pseudo,
                                        });
                
            }
            
        
          
    } 
}