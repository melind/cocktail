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
var user_1 = require ('../models/user');

var nodemailer = require ('nodemailer');


var jsonwebtoken = require ('jsonwebtoken');

 class DeleteController {

 static async deleteAccount(request, response) {

        // get user info from jwt
           
         const token = request.cookies.jwt;
         if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      })
            }
           if(token){ 

           const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
           const pseudo = decodedToken.nickname

          //get user corresponding in data base for remove it
          let mail_user_delete;
           const user  = await user_1.User.findOne({pseudo});
               if(user) {
                 mail_user_delete = user.mail;
                  //@ts-ignore
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
                               // Send the email
                                      let transporter = nodemailer.createTransport({ 
                                            host: 'email-smtp.eu-west-2.amazonaws.com', 
                                            auth: { user: process.env.AWS_ACCESS_KEY_ID, pass: process.env.AWS_SECRET_ACCESS_KEY } ,
                                            port: 587,
                                            secure:false,
                                            debug: true,
                                            tls: {
                                                  rejectUnauthorized: false,
                                            }
                                      });
                                      let mailOptions = { 
                                        from: 'no-reply-cocktail@pechemelba.fr', 
                                        to: user.mail, 
                                        subject: 'Confirm account delete', 
                                        html: '<html><body>Hello,</br></br>Your Account has been deleted successfully.</br></br>Cocktail </body></body>' 
                                      }; 
                                      // @ts-ignore
                                      transporter.sendMail(mailOptions, function (err) {
                                          if (err) { return response.status(500).json({ msg: err.message }); }
                                          response.status(200).json(' Delete account succes. A confirmation of the delete email has been sent to ' + mail_user_delete + '.');
                                      });
                               }
                          });
                }

                
            }
 }  

 static async deleteOtherAccount(request, response) {

      // get user info from jwt
        let user_to_delete = request.params.user; 
        
        let pseudo = user_to_delete;
         const token = request.cookies.jwt;
         if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      })
            }
           if(token){ 

           const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
           const mail = decodedToken.mail
          if (mail === process.env.MAIL_ADMIN) {

          
          //get user corresponding in data base for remove it
            //@ts-ignore
           const user  = await user_1.User.findOne({pseudo});
               if(user) { //@ts-ignore
                         user.remove((error, product) => {
                            if (error) {
                            
                               
                                response.status(400).json({
                                                           error
                                })
                            }
                            else { 
                              
                               response.status(200).json({
                                                    text: "Delete other account succes"
                                                   });
                               }
                          });
                }

               } 
            }
 
} 
 
}
exports["default"] = DeleteController;