"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

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
                                    httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                    secure: true // true to force https
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
                                 httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                                 secure: true // true to force https
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