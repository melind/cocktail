exports.__esModule = true;
var User = require ('../models/user');


 class AdminController {

    static async usersList(request, response) {

        const users  = await User.find();

        if (!users) {
                        response.status(400).json({
                          text: "Pas d'utilisateurs inscrit"
                        }); 
                         
                    } 
        else {
        response.status(200).json({
                    text: "List of users",
                    users
                    });
        }
    }

}
exports["default"] = AdminController;