import {Request, Response} from 'express';

import {User, IUser} from '../models/user';


export default class AdminController {

    static async usersList(request: Request, response: Response) {

        const users: IUser[]  = await User.find();

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