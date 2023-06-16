const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
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

    const utilisateur = new Utilisateur({
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
    });
    try{
        const savedUser = await utilisateur.save();
        res.status(201).send({ utilisateur: savedUser });
    } catch (err) {
        res.status(400).send({ status: "failed", msg: err })
    }
}

const login = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    //vérification de l'adresse mail
    const utilisateur = await Utilisateur.findOne({ adresse_mail: req.body.adresse_mail });
    if(!utilisateur){
        return res.status(409).send({
            msg:'Adresse mail invalide!'
        });
    }
    //vérification du mot de passe
    const validPass = await bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe);
    if(!validPass){
        return res.status(409).send({
            msg: "Mot de passe invalide"
        })
    }

    //création du token
    const token = jwt.sign({ _id : utilisateur._id, role: utilisateur.role }, JWT_SECRET, { expiresIn: '1h' });
    utilisateur.auth_token = token;
    utilisateur.last_login = Date.now();
    await utilisateur.save();
    res.header("auth-token", token);
    return res.status(200).send({
        msg:'Connecté',
        token,
        utilisateur: utilisateur
    });
    
}

const get_user = async (req, res) => {

    try{
        const authToken = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(authToken, JWT_SECRET);
        
        const utilisateur = await Utilisateur.findOne({ _id: decode._id, auth_token: authToken });
        if(utilisateur){
            res.status(200).send({ success:true, data:utilisateur, message: 'Utilisateur récupéré avec succès!' });
        }else{
            res.status(401).send({ msg: "Token invalide" });
        }
    } catch (err) {
        res.status(400).send({ msg: err });
    }

}

const get_all = async (req, res) => {

    try{
        const utilisateurs = await Utilisateur.find({ bloque: false});
        res.status(200).send(utilisateurs);
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}

const get_one = async (req, res) => {

    const id = req.params.id;
    try{
        const utilisateur = await Utilisateur.findById(id);
        if(!utilisateur) return res.status(404).send({ msg: "Cet utilisateur n'existe pas" });
        res.status(200).send(utilisateur);
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}

const update = async (req, res) => {

    const id = req.params.id;
    try{
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        if(!utilisateur) return res.status(404).send({ msg: "Cet utilisateur n'existe pas" });
        res.status(200).send(utilisateur);
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}

const bloquer = async (req, res) => {

    const id = req.params.id;
    try{
        const utilisateur = await Utilisateur.findById(id);
        if(!utilisateur) return res.status(404).send({ msg: "Cet utilisateur n'existe pas" });
        utilisateur.bloque = true;
        await utilisateur.save();
        res.status(200).send({ msg: "utilisateur bloqué", utilisateur: utilisateur });
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}

module.exports = {
    register,
    login,
    get_user,
    get_all,
    get_one,
    update,
    bloquer,
    //forgetPassword,
    //resetPasswordLoad
}