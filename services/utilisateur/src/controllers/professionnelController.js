const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Professionnel = require('../database/models/Professionnel')
const {Utilisateur} = require('../database/models/Utilisateur')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const register = async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const emailExist = await Utilisateur.findOne({ adresse_mail: req.body.adresse_mail });
    if(emailExist){
        return res.status(409).send({
            msg:'Cet utilisateur exite déjà !'
        });
    }

    const { mot_de_passe, mot_de_passe_confirme } = req.body;
    if(mot_de_passe !== mot_de_passe_confirme){
        return res.status(400).send({
            msg: "Les deux mots de passe ne correspondent pas"
        });
    }else{
        const hash = await bcrypt.hash(req.body.mot_de_passe, 10);
        req.body.mot_de_passe = hash
    }

    try{
        const savedProfessionnel = req?.body && (await Professionnel.create(req.body));
        if(req.file){
            savedProfessionnel.image = req.file.filename;
            await savedProfessionnel.save();
        }
        res.status(201).send({ professionnel: savedProfessionnel });
    } catch (err) {
        res.status(500).send({ status: "failed", msg: err })
    }
}


module.exports = {
    register,
    //verifyMail,
}