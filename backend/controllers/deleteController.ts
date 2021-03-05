import {Request, Response} from 'express';

import {User, IUser} from '../models/user';


import * as jsonwebtoken from 'jsonwebtoken';

export default class DeleteController {

 static async deleteAccount(request: Request, response: Response) {

        // get user info from jwt
           
         const token: any = request.cookies.jwt;
         if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      })
            }
           if(token){ 

           const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
           const pseudo = decodedToken.nickname

          //get user corresponding in data base for remove it

           const user: IUser  = await User.findOne({pseudo});
               if(user) { 
                         user.remove((error, product) => {
                            if (error) {
                            
                               
                                response.status(400).json({
                                                           error
                                })
                            }
                            else { 
                              //we delete the coockie and session
                               response.clearCookie('jwt');

                               request.session.destroy( (err) => {
                                     if(err) {
                                   
                                     }
                               });
                               response.status(200).json({
                                                    text: "Delete account succes"
                                                   });
                               }
                          });
                }

                
            }
 }  

 static async deleteOtherAccount(request: Request, response: Response) {


} 
 
}