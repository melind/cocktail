import  dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import bodyparser from 'body-parser';

import homeController from './controllers/homeController';
import authController from './controllers/authController';
import resetController from './controllers/resetController';
import accountController from './controllers/accountController';
import deleteController from './controllers/deleteController';
import cocktailsController from './controllers/cocktailsController';
import adminController from './controllers/adminController';
import authMiddleware from './middlewares/authMiddleware';
import adminMiddleware from './middlewares/adminMiddleware';
 
const router: express.Router = express.Router();

const bodyParser = bodyparser.urlencoded({extended: true});
/*----------abortcontroller-------------------*/

router.get('/', homeController.pseudoUser);

router.get('/admin', adminMiddleware, adminController.usersList);

router.post('/login', bodyParser, authController.postLogin);
router.get('/logout', authController.logout);

router.delete('/delete-account', deleteController.deleteAccount);
router.delete('/delete-other-account/:user', deleteController.deleteOtherAccount);

router.post('/signup',bodyParser, authController.postSignup);
router.get('/confirmation/:token', authController.userConfirmation);
router.post('/resend', bodyParser, authController.resendToken);

router.post('/reset-password', bodyParser, resetController.resetPassword);

router.route('/new-password/:passwordResetToken')
        .get( resetController.editFormPassword)
        .post(bodyParser, resetController.newPassword);


router.get('/account', authMiddleware, accountController.displayAccount);

router.route('/update-mail')
        .get(authMiddleware)
        .put(bodyParser, accountController.updateMail);

router.route('/update-password')
        .get(authMiddleware)
        .put(bodyParser, accountController.updatePassword);

router.route('/update-user-name')
        .get(authMiddleware)
        .put( bodyParser, accountController.updatePseudo);

router.get('/cocktail/:cocktail_name', cocktailsController.cocktail);
router.get('/cocktails_by_ingredient/:ingredient', cocktailsController.cocktailsSearchByIngredient);
router.get('/home', cocktailsController.cocktailsRandom);
router.get('/cocktails_alcoholic', cocktailsController.cocktailsAlcoholic);
router.get('/cocktails_Non_alcoholic', cocktailsController.cocktailsNonAlcoholic); 

export default router;


