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

    const hash = await bcrypt.hash(req.body.mot_de_passe, 10);

    const professionnel = new Professionnel({
        nom: req.body.nom,
        prenom: req.body.prenom,
        date_naissance: req.body.date_naissance,
        sexe: req.body.sexe,
        numero: req.body.numero,
        adresse: req.body.adresse,
        adresse_mail: req.body.adresse_mail,
        mot_de_passe: hash,
        image: req.body.image,
        is_admin: req.body.is_admin,
        specialite: req.body.specialite,
    });
    try{
        const savedProfessionnel = await professionnel.save();
        res.status(201).send({ professionnel: savedProfessionnel });
    } catch (err) {
        res.status(400).send({ status: "failed", msg: err })
    }
}


module.exports = {
    register,
    //verifyMail,
    //getUser,
    //forgetPassword,
    //resetPasswordLoad
}