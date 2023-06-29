const {check} = require('express-validator');

exports.createArticleValidation = [
    check('titre','Le titre est obligatoire').not().isEmpty(),
    check('contenu','Le contenu est obligatoire').not().isEmpty(),
    // check('image').custom( (value, {req}) =>{
        
    //     if(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png'){
    //         return true;
    //     }else{
    //         return false;
    //     }

    // }).withMessage('Veuillez charger une image de type PNG, JPEG')
]
