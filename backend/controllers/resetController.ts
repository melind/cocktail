import {Request, Response} from 'express';

import {User, IUser} from '../models/user';

import {Token, IToken} from '../models/token';

import * as bcrypt from 'bcryptjs';

import * as jsonwebtoken from 'jsonwebtoken';

import  htmlspecialchars from 'htmlspecialchars';

import nodemailer from 'nodemailer';

import aws from 'aws-sdk';


export default class ResetController {

    static async resetPassword(request: Request, response: Response) {

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
                                                 text: "Requête invalide"
                                                 });       
                    
                     
                                               
          } 
          

          const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
          const regexMail = regex.test(mail);
         
           if (!regexMail) {
             response.status(400).json({
                                         text: "Format de mail invalide"
                                        });   
            }
         
          if (regexMail) {

            
        /*------------------  find the user -- -----------*/

              const user: IUser  = await User.findOne({"mail":mail});

              if (!user) {
                        response.status(400).json({
                          text: "Cet utilisateur n'existe pas"
                        }); 
                         
                    } 

       
              if (user) { 
                  // Create a reset token for user
                  const regex = /\//g;
                  let passwordResetToken = bcrypt.hashSync(process.env.TOKEN_WORD, 10);

                  // Save the verification token
                  // @ts-ignore
                  user.updateOne({'passwordResetToken':passwordResetToken}, (error) => {
                    if (error) { 
                      return response.status(500).json({ error }); 
                    }
                  
                   
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
                    
                    let passwordResetTokenMail = passwordResetToken.replace(regex, "%2F");
                    let mailOptions = { 
                      from: 'no-reply@events-world-wide.fr', 
                      to: user.mail, 
                      subject: 'Réinitialisation de votre mot de passe', 
                      html: '<html><body>Vous recevez ce message parce que vous (ou quelqu\'un d\'autre) a fait une demande de réinitialisation de mot de passe pour ce compte.</br></br>' +
                            'S\'il vous plaît, cliquer sur ce lien, ou copiez le dans votre navigateur pour compléter le processus : ' +
                            '<a href="http://'+ request.headers.host + '\/new-password\/' + passwordResetTokenMail + ' ">Cliquez ici</a>.</br></br>' +
                            'Si vous n\'êtes pas à l\'origine de cette demande, s\'il vous plaît ignorez cet e-mail et votre mot de passe restera inchangé.</br></br>Events World Wide</body></html>'
                       };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                        response.status(200).json('Un e-mail de reinitialisation a été envoyé à ' + user.mail + '.');
                    });

                  });
             
            
        
              }
      }
      }
          catch (err) {
            err
          }
          
    }

    static async editFormPassword(request: Request, response: Response) {
              

              let passwordResetToken = request.params.passwordResetToken;
              if (!passwordResetToken) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
                // Find a matching token  
              
              const user = await User.findOne({ passwordResetToken: passwordResetToken });
                
               if (!user) return response.status(400).json("pas de user trouvé"+
                                                       passwordResetToken); 

                response.status(200).json({
                                                       //user,
                                                       text: "Accès autorisé Modifications password!"
                                                      });
                
              
    }

    static async newPassword(request: Request, response: Response) {
        
        try{ 

              let password = request.body.password;
              password = password.replace(/ /g,""); password = htmlspecialchars(password);
              password = bcrypt.hashSync(password, 10);
    
              let passwordResetToken = request.params.passwordResetToken;
              if (!passwordResetToken) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
                
                // Find a matching token
              const user = await User.findOne({ passwordResetToken: passwordResetToken }, async (err, product) => {
                    if (err) { 
                      return response.status(500).json({ err }); }
                    });             
                    if (!user) return response.status(400).json({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

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
                      from: 'no-reply@events-world-wide.fr', 
                      to: user.mail, 
                      subject: 'Mot de passe réinitialisé', 
                      text: 'Votre mot de passe a bien été réinitialisé ! \n\n Events World Wide '
                    };
                    // @ts-ignore
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                          return response.status(500).json({ err}); 
                       }
                       response.status(200).json('Mot de passe changé ! ' );
                    });

                
    
              });
              
              }
          catch (err) {
            err
          }
    }
}