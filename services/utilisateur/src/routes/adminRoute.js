const router = require("express").Router();

const { signUpValidation } = require('../helpers/validation');
const adminController = require('../controllers/adminController');
var upload = require('../middlewares/uploadImage');


router.post('/administrateur/register', upload.single('image'), signUpValidation, adminController.register);


module.exports = router;