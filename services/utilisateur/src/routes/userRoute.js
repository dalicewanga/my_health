const router = require("express").Router();
const { signUpValidation, loginValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');

router.get('/all', (req, res) => {
    res.send("Utilisateurs")
});
router.post('/register', signUpValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/get_user', userController.get_user);
router.get('/get/all', userController.get_all);
router.get('/get/:id', userController.get_one);
router.patch('/update/:id', userController.update);
router.patch('/bloquer/:id', userController.bloquer);


module.exports = router;