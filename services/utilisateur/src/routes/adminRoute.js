const router = require("express").Router();
const { signUpValidation, loginValidation } = require('../helpers/validation');
const adminController = require('../controllers/adminController');

router.get('/all', (req, res) => {
    res.send("Utilisateurs")
});
router.post('/administrateur/register', signUpValidation, adminController.register);


module.exports = router;