exports.__esModule = true;
var user_1 = require ('../models/user');


 class AdminController {

    static async usersList(request, response) {

        const users  = await user_1.User.find();

        if (!users) {
                        response.status(400).json({
                          text: "Pas d'utilisateurs inscrit"
                        }); 
                         
                    } 
        else {
        response.status(200).json({
                    text: "List of users",
                    users: users.pseudo
                    });
        }
    }

}
exports["default"] = AdminController;