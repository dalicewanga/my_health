const { validationResult } = require('express-validator');
const sendMail = require('../services/sendMail');


const send_mail = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    sendMail(req.body.adresse_mail, req.body.objet, req.body.contenu);
    console.log(req.body.adresse_mail);
    console.log(req.body.objet);
    console.log(req.body.contenu);
    return res.status(200).send({
        msg:'Mail envoyé!'
    });
}

module.exports = {
    send_mail,
}