exports.__esModule = true;
var user_1= require ('../models/user');
var bcrypt = require ('bcryptjs');
var  jsonwebtoken = require ('jsonwebtoken');
var  htmlspecialchars = require ('htmlspecialchars');

 class AccountController {

  

    static async displayAccount(request, response) {

           //get info in thejwt
           const token = request.cookies.jwt;
           if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      });
           } 
           if(token){ 

              const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
              const pseudo = decodedToken.nickname;
            try { 
              // get user corresponding in data base 
              const user  = await user_1.User.findOne({pseudo});
                 if (user) {
                 response.status(200).json({
                                         user,
                                        });
                 }

                 } catch (err) {
                    response.status(400).json({
                    err
                          });
                 }
            }
            
        
          
    } 



      

      static async updatePseudo(request, response) {


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
              
                   const token = request.cookies.jwt;

                   if (!token) {
                              response.status(400).json({
                                text: "No user coockie"
                              });
                   } 

                   else{ 

                       const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                       const name = decodedToken.nickname;
                   
                  
 
        /*------------------  Update of a  user -- -----------*/

         
                       const oldUser  = await user_1.User.findOne({"pseudo":name});
                       if (oldUser) {
                          // @ts-ignore
                           oldUser.updateOne({pseudo},async (error, product) => {
                                  if (error) {
                                  
                                      response.status(400).json({
                                                                 error
                                      });
                            }
                            
                            const user =  await user_1.User.findOne({pseudo});
                           
                            const newToken = jsonwebtoken.sign({
                              nickname: user.pseudo,
                              mail: user.mail,
                              exp: (new Date().getTime() + 60 * 60 * 1000)/1000,//exp dans 1h
                              
                             },
                             process.env.JWT_PRIVATE_KEY,
                             /*{
                                "algorithm": process.env.ALGORYTHME,
                              } doesn't work but by default is HS256*/
                              

                             ); 
                             
                              response.cookie('jwt', newToken, { 
                                 httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                 secure: true, // true to force https
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
            response.status(400).json({
              err
                    })
          }

          
}     




         static async updateMail(request, response) {



        
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
                      const token = request.cookies.jwt;

                      if (!token) {
                                 response.status(400).json({
                                   text: "No user coockie"
                                 });
                      } 

                      if(token){ 
                      
                          const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                          const name = decodedToken.nickname;
                   
               

        /*------------------  Update of a  user -- -----------*/

         
                          const oldUser  = await user_1.User.findOne({"pseudo":name});
                          if (oldUser) {
                             // @ts-ignore
                              oldUser.updateOne({mail},async (error, product) => {
                                     if (error) {
                                     
                                         
                                         response.status(400).json({
                                                                    error
                                         });
                               }

                               const user =  await user_1.User.findOne({mail});
                              
                               const newToken = jsonwebtoken.sign({
                                 nickname: user.pseudo,
                                 mail: user.mail,
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
            response.status(400).json({
              err
                    })
          }

          
      }    


        static async updatePassword(request, response) {



             
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
              
                   const token = request.cookies.jwt;

                   if (!token) {
                              response.status(400).json({
                                text: "No user cookie"
                              });
                   } 

                   if(token){ 

                       const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
                       const name = decodedToken.nickname;
                   
               

        /*------------------  Update of a  user -- -----------*/

         
                       const oldUser  = await user_1.User.findOne({"pseudo":name});
                       if (oldUser) {
                          // @ts-ignore
                           oldUser.updateOne({password},async (error, product) => {
                                  if (error) {
                                  
                                      
                                      response.status(400).json({
                                                                 error
                                      });
                            }
                            
                            const user =  await user_1.User.findOne({password});
                         
                            const newToken = jsonwebtoken.sign({
                              nickname: user.pseudo,
                              mail: user.mail,
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
                response.status(400).json({
                  err
                        })
              }
        
        
        }     
       

}
exports["default"] = AccountController;