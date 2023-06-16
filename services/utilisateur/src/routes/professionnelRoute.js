const router = require("express").Router();
const { signUpValidation, loginValidation, specialiteValidation } = require('../helpers/validation');
const professionnelController = require('../controllers/professionnelController');

router.get('/all', (req, res) => {
    res.send("Utilisateurs")
});
router.post('/professionnel/register', signUpValidation, specialiteValidation, professionnelController.register);

//router.post('/professionnel/login', loginValidation, professionnelController.login);


module.exports = router;