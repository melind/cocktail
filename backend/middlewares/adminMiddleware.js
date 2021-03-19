/*
exports.__esModule = true;

var jsonwebtoken = require("jsonwebtoken");

function default_1 (request, response, next) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/account','/update-mail','/update-password', '/update-user-name','/logout','/admin-938-kml'].includes(request.url) ) {
    const token = request.cookies.jwt;
     // @ts-ignore
    const csrf= request.session.csrf;
 
    try {
       // @ts-ignore
      const decodedToken=  jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
         // @ts-ignore
        if ((decodedToken.mail === process.env.MAIL ) && csrf) {
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
*/

"use strict";
exports.__esModule = true;
var jsonwebtoken = require("jsonwebtoken");
function default_1(request, response, next) {
    // check cookie presence and good jwt
    // no need to check for this pages so we get their url (http://....)
    if (['/', '/login', '/signup','home'].includes(request.url)) {
        next();
    }
    else {
      
        var token = request.cookies.jwt;
        var csrf = request.session.csrf;
        try {
            var decodedToken = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY);
            if ((decodedToken.mail === process.env.MAIL) && csrf) {
                next();
            }
            else {
                response.status(403).end();
            }
        }
        catch (error) {
            response.status(403).end();
        }
    }
}
exports["default"] = default_1;
