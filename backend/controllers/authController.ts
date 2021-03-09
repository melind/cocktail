import {Request, Response} from 'express';

import {User, IUser} from '../models/user';

import {Token, IToken} from '../models/token';

import * as bcrypt from 'bcryptjs';

import * as jsonwebtoken from 'jsonwebtoken';

import  htmlspecialchars from 'htmlspecialchars';

import nodemailer from 'nodemailer';

import aws from 'aws-sdk';


export default class AuthController { 

  pseudo: string;
  mail: string;
  password: string;  
  date: Date;
  admin: boolean;

  /** static permet nom_classs.nom_methode = AuthController.getSignup */
    


    static postSignup(request: Request, response: Response) {

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
         
          if (regexMail) {

            if (password.length <8){
            response.status(400).json({
                                         text: "Password must contains at least 8 characters"
                                        });
          }
          else { 
        /*------------------  Creation of a new user -- -----------*/

                // crypt password  auto gen salt and hash
                
        password = bcrypt.hashSync(password, 10);

                // Creation of a document User
        const newUser: IUser = new User({pseudo, mail, password, date, admin}); 

                // Save in the database
        newUser.save( (error, product) => {
            if (error) {
               
                
                response.status(400).json({
                                           error
                                                 })
            }
  
            else {
                  // Create a verification token for user
                  let token = new Token({ userId: newUser._id, token: bcrypt.hashSync(process.env.TOKEN_WORD, 10)});

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
                      from: 'no-reply-cocktail@pechemelba.fr', 
                      to: newUser.mail, 
                      subject: 'Valid account', 
                      html: '<html><body>Hello,</br></br>' + 'Please click to the link to valid your account: <a href="http:\/\/' + request.headers.host + '\/confirmation\/' + token.token + '">Click here </a>.</br></br>Cocktail </body></body>'
                    };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                        response.status(200).json('A confirmation e-mail send ' + newUser.mail + '.');
                    });
                });
             }
            
        });
      }
     }
    }
    



    static async userConfirmation(request: Request, response: Response) {
            // Find a matching token
            let token_mail = request.params.token;
            //@ts-ignore
            const token =  Token.findOne({ token: token_mail }, function (err, token) {
            if (!token) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
            
            // If we found a token, find a matching user
            const user =  User.findOne({ _id: token.userId }, function (err, user) {
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


    static async resendToken(request: Request, response: Response) {
            
      User.findOne({ mail: htmlspecialchars(request.body.mail) }, function (err, user) {
          if (!user) return response.status(400).json({ msg: 'We were unable to find a user with that email.' });
          if (user.isVerified) return response.status(400).json({ msg: 'This account has already been verified. Please log in.' });
   
          // Create a verification token, save it, and send email
          let token = new Token({ userId: user._id, token: bcrypt.hashSync(process.env.TOKEN_WORD, 10) });
     
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
                from: 'no-reply-cocktail@pechemelba.fr', 
                to: user.mail, 
                subject: 'Valid account', 
                html: '<html><body>Hello,</br></br>' + 'Please click to the link to valid your account: <a href="http:\/\/' + request.headers.host + '\/confirmation\/' + token.token + '">Click here </a>.</br></br>Cocktail </body></body>' 
              }; 
              // @ts-ignore
              transporter.sendMail(mailOptions, function (err) {
                  if (err) { return response.status(500).json({ msg: err.message }); }
                  response.status(200).json('A verification email has been sent to ' + user.mail + '.');
              });
          });
   
      });
  }

    static async postLogin(request: Request, response: Response) {

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
      
                const user: IUser  = await User.findOne({pseudo});
                 

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
                if (pseudo && password) {
                      
                       
                  
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
                   //httpOnly: true, //cookie not available through client js code (xss)!!! pas de cookie.load
                   //secure: true // true to force https
                   maxAge: 60 * 60 * 1000 
                 });  
                 response.status(200).json({
                    text: "Succès for post login",
                    csrf
                    });
                    
                
                     
        }   
                 } 
        catch (error) { 
           return error
           
        }
      
      
    
        

    }


    
    static logout(request: Request, response: Response) {
          //destroy token by destroying cookie
        response.clearCookie('jwt');
        
        request.session.destroy( (err) => {
                     if(err) {
                       
                     }
               });
     
        response.status(200).json({
            text: "Succès for logout"
        });

       
        
             
    }
}
