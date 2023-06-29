const router = require("express").Router();

const { signUpValidation, professionValidation } = require('../helpers/validation');
const patientController = require('../controllers/patientController');
var upload = require('../middlewares/uploadImage');


router.post('/patient/register', upload.single('image'), signUpValidation, professionValidation, patientController.register);


module.exports = router;