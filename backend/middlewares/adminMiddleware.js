exports.__esModule = true;

var jsonwebtoken = require("jsonwebtoken");
var mail = process.env.MAIL;
function default_1(request, response, next) {
  // check cookie presence and good jwt

  // no need to check for this pages so we get their url (http://....)
  if ( ['/admin-938-kml'].includes(request.url) ) {
       const token = request.cookies.jwt;
       // @ts-ignore
       const csrf = request.session.csrf; 
 
    
  
    
    try {
      // @ts-ignore
      const decodedToken = jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
    // @ts-ignore
        if ((decodedToken.mail == mail ) && csrf) {
        
         // @ts-ignore
        next();
      } else {
        
        response.status(403).end();
      }
    } catch (error) {
      
      response.status(403).end();
    }
    
  }
    else {
       response.status(403).end();
    }
}
exports["default"] = default_1;