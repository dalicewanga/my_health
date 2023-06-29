const router = require("express").Router();

const { signUpValidation, specialiteValidation } = require('../helpers/validation');
const professionnelController = require('../controllers/professionnelController');
var upload = require('../middlewares/uploadImage');


router.post('/professionnel/register', upload.single('image'), signUpValidation, specialiteValidation, professionnelController.register);


module.exports = router;