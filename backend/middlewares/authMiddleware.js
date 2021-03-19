"use strict";
exports.__esModule = true;

var jsonwebtoken = require("jsonwebtoken");

function default_1 (request, response, next) {
  // check cookie presence and good jwt
  // no need to check for this pages so we get their url (http://....)
  if ( ['/account','/update-mail','/update-password', '/update-user-name','/logout'].includes(request.url) ) {
    var token = request.cookies.jwt;
     // @ts-ignore
    var csrf= request.session.csrf;
 console.log("mail,", process.env.MAIL)
    try {
       // @ts-ignore
      var decodedToken= jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
         // @ts-ignore
        if (decodedToken && csrf) {
           // @ts-ignore
           console.log("decode", decodedToken, "decodmail",decodedToken.mail)

        next();
      } else {
        response.status(401).end();
      }
    } catch (error) {
      
      
      response.status(401).end();
    }
    } else {

    response.status(401).end();
  }
}

exports["default"] = default_1;