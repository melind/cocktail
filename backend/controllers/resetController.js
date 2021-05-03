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

var jsonwebtoken = require ('jsonwebtoken');
var  bcrypt = require ('bcryptjs');
var  htmlspecialchars = require ('htmlspecialchars');

var nodemailer = require ('nodemailer');



 class ResetController {

    static async resetPassword(request, response) {

     try{ 

        let mail = request.body.mail;
        let date= new Date();
       
        mail = mail.replace(/ /g,"");
        mail = htmlspecialchars(mail);
     
        /* pas besoin de verifier si user existe dans bdd vu que je use unique in bdd
        pas besoin de async await*/
        if (!mail) {
            //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                      response.status(400).json({
                                                 text: "Requst invalid"
                                                 });       
                    
                     
                                               
          } 
          

          const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
          const regexMail = regex.test(mail);
         
           if (!regexMail) {
             response.status(400).json({
                                         text: "Mail format invalid"
                                        });   
            }
         
          if (regexMail) {

            
        /*------------------  find the user -- -----------*/

              const user  = await user_1.User.findOne({"mail":mail});

              if (!user) {
                        response.status(400).json({
                          text: "User don't exist"
                        }); 
                         
                    } 

       
              if (user) { 
                  // Create a reset token for user
                  //const regex = /\//g;
                  let tokenGen = bcrypt.hashSync(process.env.TOKEN_WORD, 10);
                  if (tokenGen.includes("/"||".")) {
                    tokenGen = bcrypt.hashSync(process.env.TOKEN_WORD, 10);
                 }

                 else { 
                  let passwordResetToken = tokenGen;

                  // Save the verification token
                  // @ts-ignore
                  user.updateOne({'passwordResetToken':passwordResetToken}, (error) => {
                    if (error) { 
                      return response.status(500).json({ error }); 
                    }
                  
                    const URL_CORS = process.env.URL_CORS;
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
                    
                    let passwordResetTokenMail = tokenGen;//passwordResetToken.replace(regex, "%2F")
                    let mailOptions = { 
                      headers: {'Access-Control-Allow-Origin':URL_CORS, 'Access-Control-Allow-Headers':'Content-Type'},
                      from: 'no-reply-cocktail@pechemelba.fr', 
                      to: user.mail, 
                      subject: 'Password Reset ', 
                      html: '<html><body>You recieve this e-mail beacause you (or someone else) ask to reset the password.</br></br>' +
                            'Please, click to the link, or past it in your browser to finish the process : ' +
                            '<a href="https:\/\/cocktail.pechemelba.fr\/new-password\/' + passwordResetTokenMail + ' ">Click here</a>.</br></br>' +
                            'If you have not ask for this reset, please ignore this e-mail and your password will be unchanged.</br></br>Cocktail</body></html>'
                       };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                        response.status(200).json('An e-mail reset as been send to ' + user.mail + '.');
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

    static async editFormPassword(request, response) {
              
            
              let passwordResetToken = request.params.passwordResetToken;
              if (!passwordResetToken) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
                // Find a matching token  
              
              const user = await user_1.User.findOne({ passwordResetToken: passwordResetToken });
                
               if (!user) return response.status(400).json("user not found"+
                                                       passwordResetToken); 
               
                 
                response.status(200).json({
                                                       //user,
                                                       text: "Access autorised for Modificate password!"
                                                      });
                
              
    }

    static async newPassword(request, response) {
    
      
        try{ 
          let passwordResetToken = request.params.passwordResetToken;
          
          if (!passwordResetToken) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
     
              let password = request.body.password;
              password = password.replace(/ /g,""); password = htmlspecialchars(password);
              password = bcrypt.hashSync(password, 10);
    
              
                // Find a matching token
              const user = await user_1.User.findOne({ passwordResetToken: passwordResetToken }, async (err, product) => {
                    if (err) { 
                      return response.status(500).json({ err }); }
                    });             
                    if (!user) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a user with a valid token. Your token my have expired.' });

                // If we found a token, find a matching user
                // @ts-ignore
                user.updateOne({ password: password, passwordResetToken: "" }, async (err, product) => {
                    if (err) { 
                      return response.status(500).json({ err }); 
                    }
                    

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
                      subject: 'Reset Password', 
                      text: 'Reset password success ! \n\n Cocktail '
                    };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                       
                       response.status(200).json('Password change ! ' );
                    });

                
    
              });
              
              }
          catch (err) {
            response.status(400).json({
              err
                    })
          }
    }
}
exports["default"] = ResetController;