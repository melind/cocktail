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

var token_1= require ('../models/token');

var  bcrypt = require ('bcryptjs');
var jsonwebtoken = require ('jsonwebtoken');
var  htmlspecialchars = require ('htmlspecialchars');

var nodemailer = require ('nodemailer');



 class AuthController { 

 

  /** static permet nom_classs.nom_methode = AuthController.getSignup */
    


    static postSignup(request, response) {

        const URL_CORS = process.env.URL_CORS
        /*-----------------   data of the form   -----------------*/
        let {pseudo, mail, password}  = request.body;

        let date= new Date();
        let admin = false;

        pseudo = pseudo.replace(/ /g,"");
        mail = mail.replace(/ /g,"");
        password = password.replace(/ /g,"");


        pseudo = htmlspecialchars(pseudo);
        password = htmlspecialchars(password);
        mail = htmlspecialchars(mail);
     
        /* pas besoin de verifier si user existe dans bdd vu que je use unique in bdd
        pas besoin de async await*/
        if (!pseudo || !mail || !password) {
            //Le cas où l'email ou bien le password ne serait pas soumit ou nul
                      response.status(400).json({
                                                 text: "Request invalid"
                                                 });       
                    
                     
                                               
          } 
          

          const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
          const regexMail = regex.test(mail);
         
           if (!regexMail) {
             response.status(400).json({
                                         text: "Mail format invalid"
                                        });   
            }
         
         

            if (password.length <8){
            response.status(400).json({
                                         text: "Password must contains at least 8 characters"
                                        });
        
         
        /*------------------  Creation of a new user -- -----------*/

                // crypt password  auto gen salt and hash
                
        password = bcrypt.hashSync(password, 10);

                // Creation of a document User
        const newUser = new user_1.User({pseudo, mail, password, date, admin}); 

                // Save in the database
        newUser.save( (error, product) => {
            if (error) {
               
                
               return response.status(400).json({
                                           error
                                                 })
            }
  
           
                  // Create a verification token for user
                  let tokenGen = bcrypt.hashSync(process.env.TOKEN_WORD, 10);
                  if (tokenGen.includes("/"||".")) {
                    tokenGen = bcrypt.hashSync(process.env.TOKEN_WORD, 10);
                 }

               
                  let token = new token_1.Token({ userId: newUser._id, token: tokenGen});

                  // Save the verification token
                  token.save(function (err) {
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
                      headers: {'Access-Control-Allow-Origin':URL_CORS, 'Access-Control-Allow-Headers':'Content-Type'},
                      from: 'no-reply-cocktail@pechemelba.fr', 
                      to: newUser.mail, 
                      subject: 'Valid account', 
                      html: '<html><body>Hello,</br></br>' + 'Please click to the link to valid your account: <a href="http:\/\/cocktail.pechemelba.fr\/confirm\/' + token.token + '">Click here </a>.</br></br>Cocktail </body></body>'
                    };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                        response.status(200).json('A confirmation e-mail send ' + newUser.mail + '.');
                    });
                });
             
            
        });
      
     }
    }
    



    static async userConfirmation(request, response) {
            // Find a matching token
            let token_mail = request.params.token;
            //@ts-ignore
            const token =  token_1.Token.findOne({ token: token_mail }, function (err, token) {
            if (!token) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
            
            // If we found a token, find a matching user
            const user =  user_1.User.findOne({ _id: token.userId }, function (err, user) {
                if (!user) return response.status(400).json({ msg: 'We were unable to find a user for this token.' });
                if (user.isVerified) return response.status(400).json({ type: 'already-verified', msg: 'This user has already been verified.' });
            
                // Verify and save the user
                user.isVerified = true;
                user.save(function (err) {
                    if (err) { return response.status(500).json({ err }); }
                    response.status(200).json("The account has been verified. Please log in.");
                });
            });
        });
    }


    static async resendToken(request, response) {

      const URL_CORS = process.env.URL_CORS;
      user_1.User.findOne({ mail: htmlspecialchars(request.body.mail) }, function (err, user) {
          if (!user) return response.status(400).json({ msg: 'We were unable to find a user with that email.' });
          if (user.isVerified) return response.status(400).json({ msg: 'This account has already been verified. Please log in.' });
   
          // Create a verification token, save it, and send email
          let token = new token_1.Token({ userId: user._id, token: bcrypt.hashSync(process.env.TOKEN_WORD, 10) });
     
          // Save the token
          token.save(function (err) {
              if (err) { return response.status(500).json({ msg: err.message }); }
   
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
                headers: {'Access-Control-Allow-Origin':URL_CORS, 'Access-Control-Allow-Headers':'Content-Type'},
                from: 'no-reply-cocktail@pechemelba.fr', 
                to: user.mail, 
                subject: 'Validation of your account', 
                html: '<html><body>Hello,</br></br>' + 'Please click to the link to valid your account: <a href="https:\/\/cocktail.pechemelba.fr\/confirm\/' + token.token + '">Click here </a>.</br></br>Cocktail </body></body>' 
              }; 
              // @ts-ignore
              transporter.sendMail(mailOptions, function (err) {
                  if (err) { return response.status(500).json({ msg: err.message }); }
                  response.status(200).json('A verification email has been sent to ' + user.mail + '.');
              });
          });
   
      });
  }

    static async postLogin(request, response) {

        /*-----------------   data of the form   -----------------*/
        /* when a promise encounters an error it throws 
        an exception that will be catched inside a catch method on the promise */
        try { 
                let {pseudo, password} = request.body;
                 pseudo = pseudo.replace(/ /g,"");
                 password = password.replace(/ /g,"");

                 pseudo = htmlspecialchars(pseudo);
                 password = htmlspecialchars(password);

                if (!pseudo|| !password) {
                  response.status(400).json({
                    text: "Request invalid"
                  }); 
                   
              } 

        /*----------- Check if the user exist in database ---------*/

                //  verify the pseudo 
      
                const user  = await user_1.User.findOne({pseudo});
                 

                    if (!user) {
                        response.status(400).json({
                          text: "User don't exist or wrong password"
                        }); 
                         
                    } 

                       // verify the password 
                const goodPassword = await bcrypt.compareSync(password, user.password);     
                    
                    if (!goodPassword) {
                      response.status(401).json({
                        text: "User don't exist or wrong password"
                      });
                     
                 }
                 if (!user.isVerified) { 
                
                 response.status(401).json({ type: 'not-verified', msg: 'Your account has not been verified.' }); 
                 }
                    // create a session for the user
               // request.session.stocké cote server
                    // JSONWEBTOKEN and cookie stocké  cote client qui le renverra
       
                // creation of an uuid : Universally Unique IDentifier
                let csrf = Math.random().toString(36).substr(2, 9);

                // saving of the uuid in a session
                // @ts-ignore
                request.session.csrf = csrf;
              
                    
                const token = jsonwebtoken.sign({
                              nickname: user.pseudo,
                              mail: user.mail,
                              exp: (new Date().getTime() + 60 * 60 * 1000)/1000 //exp dans 1h
                              
                          },
                          process.env.JWT_PRIVATE_KEY,
                          /*{
                             "algorithm": process.env.ALGORYTHME,
                           } doesn't work but by default is HS256*/
                           
                          );  
                 response.cookie('jwt', token, { 
                   httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                   secure: true, // true to force https
                   maxAge: 60 * 60 * 1000 
                 });  
                 response.status(200).json({
                    text: "Succès for post login"
                    });
                    
                
                     
      
                 } 
        catch (error) { 
          response.status(400).json({
            error
                  })
           
        }
      
      
    
        

    }


    
    static logout(request, response) {
          //destroy token by destroying cookie
        response.clearCookie('jwt');
        
        request.session.destroy( (err) => {
                     if(err) {
                      response.status(400).json({
                        err
                              })
                     }
               });
     
        response.status(200).json({
            text: "Succès for logout"
        });

       
        
             
    }
}
exports["default"] = AuthController;