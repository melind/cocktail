var  dotenv = require (  'dotenv');
dotenv.config();

var express = require (  'express');
var bodyparser = require (  'body-parser');

var homeController = require (  './controllers/homeController');
var authController = require (  './controllers/authController');
var resetController = require (  './controllers/resetController');
var accountController = require (  './controllers/accountController');
var deleteController = require (  './controllers/deleteController');
var cocktailsController = require (  './controllers/cocktailsController');
var adminController = require (  './controllers/adminController');
var authMiddleware_1 = require (  './middlewares/authMiddleware');
var adminMiddleware_1 = require (  './middlewares/adminMiddleware');
 
const router = express.Router();

const bodyParser = bodyparser.urlencoded({extended: true});
/*----------abortcontroller-------------------*/

router.get('/', homeController["default"].pseudoUser);
router.get('/home', cocktailsController["default"].cocktailsRandom);
router.get('/admin-938-kml',  adminController["default"].usersList);

router.post('/login', bodyParser, authController["default"].postLogin);
router.get('/logout', authController["default"].logout);

router.delete('/delete-account', deleteController["default"].deleteAccount);
router.delete('/delete-other-account/:user', deleteController["default"].deleteOtherAccount);

router.post('/signup',bodyParser, authController["default"].postSignup);
router.get('/confirmation/:token', authController["default"].userConfirmation);
router.post('/resend', bodyParser, authController["default"].resendToken);

router.post('/reset-password', bodyParser, resetController["default"].resetPassword);

router.route('/new-password/:passwordResetToken')
        .get( resetController["default"].editFormPassword)
        .post(bodyParser, resetController["default"].newPassword);


router.get('/account', authMiddleware_1["default"], accountController["default"].displayAccount);

router.route('/update-mail')
        .get(authMiddleware_1["default"])
        .put(bodyParser, accountController["default"].updateMail);

router.route('/update-password')
        .get(authMiddleware_1["default"])
        .put(bodyParser, accountController["default"].updatePassword);

router.route('/update-user-name')
        .get(authMiddleware_1["default"])
        .put( bodyParser, accountController["default"].updatePseudo);

router.get('/cocktail/:cocktail_name', cocktailsController["default"].cocktail);
router.get('/cocktails_by_ingredient/:ingredient', cocktailsController["default"].cocktailsSearchByIngredient);

router.get('/cocktails_alcoholic', cocktailsController["default"].cocktailsAlcoholic);
router.get('/cocktails_Non_alcoholic', cocktailsController["default"].cocktailsNonAlcoholic); 

exports["default"] = router;