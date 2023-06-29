const router = require("express").Router();

const { createArticleValidation } = require('../helpers/validation');
const articleController = require('../controllers/articleController');
var upload = require('../middlewares/uploadImage');


router.post('/create', upload.single('image'), createArticleValidation, articleController.create_one);
router.get('/get/:id', articleController.get_one);


module.exports = router;