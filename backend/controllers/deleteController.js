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