const router = require("express").Router();
const { signUpValidation, loginValidation, professionValidation } = require('../helpers/validation');
const patientController = require('../controllers/patientController');

router.get('/all', (req, res) => {
    res.send("Utilisateurs")
});
router.post('/patient/register', signUpValidation, professionValidation, patientController.register);

//router.post('/patient/login', loginValidation, patientController.login);


module.exports = router;