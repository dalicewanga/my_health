const router = require("express").Router();
const { sendMailValidation } = require('../helpers/validation');
const mailController = require('../controllers/mailController');

router.post('/send_mail', sendMailValidation, mailController.send_mail);


module.exports = router;