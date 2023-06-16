const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Patient = require('../database/models/Patient')
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
    req.body.mot_de_passe = hash

    // const patient = new Patient({
    //     nom: req.body.nom,
    //     prenom: req.body.prenom,
    //     date_naissance: req.body.date_naissance,
    //     sexe: req.body.sexe,
    //     numero: req.body.numero,
    //     adresse: req.body.adresse,
    //     adresse_mail: req.body.adresse_mail,
    //     mot_de_passe: hash,
    //     image: req.body.image,
    //     is_admin: req.body.is_admin,
    //     profession: req.body.profession,
    // });
    try{
        const savedPatient = req?.body && (await Patient.create(req.body));
        res.status(201).send({ patient: savedPatient });
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