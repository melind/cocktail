import  dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import bodyparser from 'body-parser';

import homeController from './controllers/homeController';
import authController from './controllers/authController';
import resetController from './controllers/resetController';
import accountController from './controllers/accountController';
import deleteController from './controllers/deleteController';
import eventsController from './controllers/eventsController';
//import adminController from './controllers/adminController';
import authMiddleware from './middlewares/authMiddleware';
//import adminMiddleware from './middlewares/adminMiddleware';
 
const router: express.Router = express.Router();

const bodyParser = bodyparser.urlencoded({extended: true});
/*----------abortcontroller-------------------*/

router.get('/', homeController.pseudoUser);

router.post('/login', bodyParser, authController.postLogin);
router.get('/logout', authMiddleware, authController.logout);

router.post('/signup',bodyParser, authController.postSignup);
router.post('/confirmation', bodyParser, authController.userConfirmation);
router.post('/resend', bodyParser, authController.resendToken);

router.post('/reset-password', bodyParser, resetController.resetPassword);

router.route('/new-password/:passwordResetToken')
        .get(authMiddleware, resetController.editFormPassword)
        .post(bodyParser, authMiddleware, resetController.newPassword);


router.get('/:location/today', eventsController.todayEventsList);
router.get('/:location/week', eventsController.weekEventsList);
router.get('/description/:eventName/:idEvent', eventsController.eventsInfo);

router.get('/account', authMiddleware, accountController.displayAccount);

router.put('/update-mail', bodyParser, authMiddleware, accountController.updateMail);
router.put('/update-password', bodyParser, authMiddleware, accountController.updatePassword);
router.put('/update-user-name', bodyParser, authMiddleware, accountController.updatePseudo);

export default router;


