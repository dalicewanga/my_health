const {check} = require('express-validator');

exports.signUpValidation = [
    check('nom','Le nom est obligatoire').not().isEmpty(),
    check('prenom','Le prenom est obligatoire').not().isEmpty(),
    check('date_naissance','Veuillez entrer une date').isDate(),
    check('sexe',"Le sexe prend la valeur Masculin | Féminin").isIn(['Masculin', 'Féminin']),
    check('adresse_mail','Veuillez entrer une adresse mail valide').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('mot_de_passe','Le mot de passe doit avoir au minimum 8 caractères').isLength({ min:8 }),
]

exports.loginValidation = [
    check('adresse_mail','Veuillez entrer une adresse mail valide').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('mot_de_passe','Le mot de passe doit avoir au minimum 8 caractères').isLength({ min:8 }),
]

exports.changePWValidation = [
    check('mot_de_passe','Le mot de passe doit avoir au minimum 8 caractères').isLength({ min:8 }),
    check('mot_de_passe_confirme','Le mot de passe doit avoir au minimum 8 caractères').isLength({ min:8 }),
]

exports.emailValidation = [
    check('adresse_mail','Veuillez entrer une adresse mail valide').isEmail().normalizeEmail({ gmail_remove_dots:true }),
]

exports.specialiteValidation = [
    check('specialite','La specialite est obligatoire').not().isEmpty(),
]

exports.professionValidation = [
    check('profession','La profession est obligatoire').not().isEmpty(),
]