const router = require("express").Router();

const { loginValidation, changePWValidation, emailValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');
const authentification = require('../middlewares/authentification');

//public routes
//router.post('/register', signUpValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.post('/reset_password_send_email', emailValidation, userController.reset_password_send_email);
router.post('/reset_password/:id/:token', changePWValidation, userController.reset_password);

//Protected routes
router.get('/me', authentification, userController.get_user);
router.post('/logout', authentification, userController.logout);
router.post('/change_password', authentification, changePWValidation, authentification, userController.change_password);
router.patch('/update/me', authentification, userController.update);
router.patch('/delete/me', authentification, userController.delete_me);
router.get('/get/all', authentification, userController.get_all);
router.get('/get/:id', userController.get_one);
router.patch('/bloquer/:id', authentification, userController.bloquer);


module.exports = router;