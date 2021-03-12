exports.__esModule = true;
var jsonwebtoken = require ('jsonwebtoken');

class homeController {

 static async pseudoUser(request, response) {

           //get info in thejwt
           const token = request.cookies.jwt;
           if (!token) {
                      response.status(400).json({
                        text: "No user coockie"
                      });
           } 
           if(token){ 

              const decodedToken= jsonwebtoken.verify(token,process.env.JWT_PRIVATE_KEY);
              const pseudo = decodedToken.nickname;

            
                 response.status(200).json({
                                         pseudo,
                                        });
                
            }
            
        
          
    } 
}
exports["default"] = homeController;