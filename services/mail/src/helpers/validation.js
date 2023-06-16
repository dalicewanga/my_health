const {check} = require('express-validator');

exports.sendMailValidation = [
    check('adresse_mail','Veuillez entrer une adresse mail valide').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('objet',"L'objet est obligatoire").not().isEmpty(),
    check('contenu','Le contenu est obligatoire').not().isEmpty()
]
