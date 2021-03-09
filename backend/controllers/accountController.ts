import {Request, Response} from 'express';

import {User, IUser} from '../models/user';

import * as bcrypt from 'bcryptjs';

import * as jsonwebtoken from 'jsonwebtoken';

import  htmlspecialchars from 'htmlspecialchars';

export default class AccountController {

  pseudo: string;
  mail: string;
  password: string;

    static async displayAccount(request: Request, response: Response) {

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
            try { 
              // get user corresponding in data base 
              const user: IUser  = await User.findOne({pseudo});
                 if (user) {
                 response.status(200).json({
                                         user,
                                        });
                 }

                 } catch (err) {
                   return err;
                 }
            }
            
        
          
    } 



      

      static async updatePseudo(request: Request, response: Response) {


        /*-----------------   data of the form   -----------------*/
        /* when a promise encounters an error it throws 
        an exception that will be catched inside a catch method on the promise */
       try{  
                let {pseudo} = request.body;


                 if (!pseudo) {
                  response.status(400).json({
                    text: "Request invalid"
                  });
                }

                 if (pseudo) { 
                   pseudo = pseudo.replace(/ /g,""); 
                   pseudo = htmlspecialchars(pseudo);
              
                   const token: any = request.cookies.jwt;

                   if (!token) {
                              response.status(400).json({
                                text: "No user coockie"
                              });
                   } 

                   else{ 

                       const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                       const name = decodedToken.nickname;
                   
                  
 
        /*------------------  Update of a  user -- -----------*/

         
                       const oldUser: IUser  = await User.findOne({"pseudo":name});
                       if (oldUser) {
                          // @ts-ignore
                           oldUser.updateOne({pseudo},async (error, product) => {
                                  if (error) {
                                  
                                      response.status(400).json({
                                                                 error
                                      });
                            }
                            
                            const user =  await User.findOne({pseudo});
                           
                            const newToken = jsonwebtoken.sign({
                              nickname: user.pseudo,
                              admin: user.admin,
                              exp: (new Date().getTime() + 60 * 60 * 1000)/1000,//exp dans 1h
                              
                             },
                             process.env.JWT_PRIVATE_KEY,
                             /*{
                                "algorithm": process.env.ALGORYTHME,
                              } doesn't work but by default is HS256*/
                              

                             ); 
                             
                              response.cookie('jwt', newToken, { 
                                 //httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                 //secure: true // true to force https
                                 maxAge: 60 * 60 * 1000
                               });  
                               response.status(200).json({
                                                       //user,
                                                       text: "Modifications success!"
                                                      });
                               });
                        }
                    }
                  }
          }
          catch (err) {
            err
          }

          
}     




         static async updateMail(request: Request, response: Response) {



        
        /*-----------------   data of the form   -----------------*/
        /* when a promise encounters an error it throws 
        an exception that will be catched inside a catch method on the promise */
       try{  
                let {mail} = request.body;


                 if (!mail) {
                  response.status(400).json({
                    text: "Request invalid"
                  });
                }

                 if (mail) { 
                   mail = mail.replace(/ /g,""); 
                   mail = htmlspecialchars(mail);

                   const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
                   const regexMail = regex.test(mail);


                   if (!regexMail) {
                       response.status(400).json({
                                         text: "Mail format invalid"
                        });   
                    }
                    if (regexMail) { 
                      const token: any = request.cookies.jwt;

                      if (!token) {
                                 response.status(400).json({
                                   text: "No user coockie"
                                 });
                      } 

                      if(token){ 
                      
                          const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                          const name = decodedToken.nickname;
                   
               

        /*------------------  Update of a  user -- -----------*/

         
                          const oldUser: IUser  = await User.findOne({"pseudo":name});
                          if (oldUser) {
                             // @ts-ignore
                              oldUser.updateOne({mail},async (error, product) => {
                                     if (error) {
                                     
                                         
                                         response.status(400).json({
                                                                    error
                                         });
                               }

                               const user =  await User.findOne({mail});
                              
                               const newToken = jsonwebtoken.sign({
                                 nickname: user.pseudo,
                                 admin: user.admin,
                                 exp: Math.floor(Date.now() / 1000) + (60 * 60),//exp dans 1h

                                },
                                process.env.JWT_PRIVATE_KEY,
                                /*{
                                   "algorithm": process.env.ALGORYTHME,
                                 } doesn't work but by default is HS256*/

                                ); 
                              
                                 response.cookie('jwt', newToken, { 
                                    //httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                    //secure: true // true to force https
                                  });  
                                  response.status(200).json({
                                                          //user,
                                                          text: "Modifications success!"
                                                         });
                                  });
                          }
                     } 
                   }
                  }
          
          }
          catch (err) {
            err
          }

          
      }    


        static async updatePassword(request: Request, response: Response) {



             
             /*-----------------   data of the form   -----------------*/
             /* when a promise encounters an error it throws 
             an exception that will be catched inside a catch method on the promise */
         try {  
                let {password} = request.body;


                 if (!password ) {
                  response.status(400).json({
                    text: "Request invalid"
                  });
                }
                if (password.length <8){
                  response.status(400).json({
                                         text: "Password not long enough"
                                        });
                 }

                 if (password) { 
                   password = password.replace(/ /g,"");
                   password = htmlspecialchars(password);
                  
                  
                   password = bcrypt.hashSync(password, 10);
              
                   const token: any = request.cookies.jwt;

                   if (!token) {
                              response.status(400).json({
                                text: "No user cookie"
                              });
                   } 

                   if(token){ 

                       const decodedToken: any = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                       const name = decodedToken.nickname;
                   
               

        /*------------------  Update of a  user -- -----------*/

         
                       const oldUser: IUser  = await User.findOne({"pseudo":name});
                       if (oldUser) {
                          // @ts-ignore
                           oldUser.updateOne({password},async (error, product) => {
                                  if (error) {
                                  
                                      
                                      response.status(400).json({
                                                                 error
                                      });
                            }
                            
                            const user =  await User.findOne({password});
                         
                            const newToken = jsonwebtoken.sign({
                              nickname: user.pseudo,
                              admin: user.admin,
                              exp: Math.floor(Date.now() / 1000) + (60 * 60),//exp dans 1h
                              
                             },
                             process.env.JWT_PRIVATE_KEY,
                             /*{
                                "algorithm": process.env.ALGORYTHME,
                              } doesn't work but by default is HS256*/

                             ); 
                          
                              response.cookie('jwt', newToken, { 
                                 //httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                 //secure: true // true to force https
                               });  
                               response.status(200).json({
                                                       //user,
                                                       text: "Modifications success!"
                                                      });
                               });
                        }
                    }
                  }
              }
              catch (err) {
                err
              }
        
        
        }     
       

}
