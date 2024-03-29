"use strict";
exports.__esModule = true;

var jsonwebtoken = require("jsonwebtoken");

function default_1 (request, response, next) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/admin-938-kml'].includes(request.url) ) {
    var token = request.cookies.jwt;
     // @ts-ignore
    var csrf = request.session.csrf;
 
    try {
       // @ts-ignore
      var decodedToken=  jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
         // @ts-ignore
        if ((decodedToken.mail === process.env.MAIL_ADMIN ) && csrf) {
           // @ts-ignore
        

        next();
      } else {
        response.status(403).end();
      }
    } catch (error) {
      
      
      response.status(403).end();
    }
    } else {

    response.status(403).end();
  }
}

exports["default"] = default_1;
