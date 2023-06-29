const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {Utilisateur} = require('../database/models/Utilisateur')
const { JWT_SECRET } = process.env;


const login = async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    //vérification de l'adresse mail
    const utilisateur = await Utilisateur.findOne({ adresse_mail: req.body.adresse_mail });
    console.log("111111111")
    console.log(utilisateur)
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

    //vérification de la validité du compte
    if(utilisateur.bloque) return res.status(401).send({ msg: "Votre compte a été bloqué!"})
    if(utilisateur.supprime) return res.status(401).send({ msg: "Votre compte a été supprimé!"})

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

const reset_password_send_email = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const utilisateur = await Utilisateur.findOne({ adresse_mail: req.body.adresse_mail });
    if(!utilisateur){
        return res.status(409).send({
            msg:"Cette adresse mail n'existe pas!"
        });
    }

    //vérification de la validité du compte
    if(utilisateur.bloque) return res.status(401).send({ msg: "Votre compte a été bloqué!"})
    if(utilisateur.supprime) return res.status(401).send({ msg: "Votre compte a été supprimé!"})

    const secret = utilisateur._id + JWT_SECRET;
    const token = jwt.sign({ _id : utilisateur._id, role: utilisateur.role }, secret, { expiresIn: '15m' });
    const link = `http://127.0.0.1:3000/my_health/utilisateur/reset_password/${utilisateur._id}/${token}`;
    console.log(link)
    //const contenu = `<a href=${link}>Cliquez ici</a> Pour réinitialiser votre mot de passe`; 
    res.status(200).send({ msg: "Veuillez vérifier vos mails" });
}

const reset_password = async(req, res) => {
        
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const { mot_de_passe, mot_de_passe_confirme } = req.body;
    
    try{
        const {id, token} = req.params;
        const utilisateur = await Utilisateur.findById(id);
        if(!utilisateur){
            return res.status(404).send({
                msg: "Cet utilisateur n'existe pas"
            });
        }
        const new_secret = utilisateur._id + JWT_SECRET;
        jwt.verify(token, new_secret)
        if(mot_de_passe !== mot_de_passe_confirme){
            res.status(400).send({ msg: "Les deux mots de passe ne correspondent pas" });
        }else{
            const hash = await bcrypt.hash(req.body.mot_de_passe, 10);
            
            utilisateur.mot_de_passe = hash;
            await utilisateur.save();
            res.status(200).send({ msg: "Mot de passe reinitialisé avec succès", utilisateur: req.utilisateur });
        }
    } catch (error) {
        res.status(500).send({ msg: error });
        console.log(error);
    }
    
}

const get_user = async (req, res) => {

    // try{
    //     const authToken = req.headers.authorization.split(' ')[1];
    //     const decode = jwt.verify(authToken, JWT_SECRET);
        
    //     const utilisateur = await Utilisateur.findOne({ _id: decode._id, auth_token: authToken });
    //     if(utilisateur){
    //         res.status(200).send({ success:true, data:utilisateur, message: 'Utilisateur récupéré avec succès!' });
    //     }else{
    //         res.status(401).send({ msg: "Token invalide" });
    //     }
    // } catch (err) {
    //     res.status(400).send({ msg: err });
    // }
    res.send(req.utilisateur);
}

const logout = async (req, res) => {
    try{
        req.utilisateur.auth_token = "";
        await req.utilisateur.save();
        res.status(200).send({ msg: "utilisateur déconnecté" });
    } catch (e) {
        res.status(500).send({ msg: e });
    }
}

const change_password = async(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }
    
    const { mot_de_passe, mot_de_passe_confirme } = req.body;
    if(mot_de_passe !== mot_de_passe_confirme){
        res.status(400).send({ msg: "Les deux mots de passe ne correspondent pas" });
    }else{
        const hash = await bcrypt.hash(req.body.mot_de_passe, 10);
        try{
            req.utilisateur.mot_de_passe = hash;
            await req.utilisateur.save();
            res.status(200).send({ msg: "Mot de passe changé avec succès", utilisateur: req.utilisateur });
        } catch (err) {
            res.status(500).send({ msg: err });
        }
    }
}

const update = async (req, res) => {
    const updatedInfo = Object.keys(req.body);
    try{
        updatedInfo.forEach(update => req.utilisateur[update] = req.body[update]);
        if(req.file){
            req.utilisateur.image = req.file.filename;
        }
        await req.utilisateur.save();
        res.status(200).send(req.utilisateur);
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}

const delete_me = async (req, res) => {
    try{
        req.utilisateur.supprime = true;
        await req.utilisateur.save();
        res.status(200).send({ msg: "utilisateur supprimé", utilisateur: req.utilisateur });
    } catch (err) {
        res.status(500).send({ msg: err });
    }
}

const bloquer = async (req, res) => {

    const id = req.params.id;
    const role = req.utilisateur.role;
    if(role !== "Administrateur"){
        res.status(401).send({ msg: "Accès refusé!" });
    }else{
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
        if(utilisateur.bloque) return res.status(400).send({ msg: "Cet utilisateur a été bloqué" });
        if(utilisateur.supprime) return res.status(400).send({ msg: "Cet utilisateur a été supprimé" });
        res.status(200).send(utilisateur);
    } catch (err) {
        res.status(500).send({ msg: err });
    }
}

module.exports = {
    login,
    reset_password_send_email,
    reset_password,
    get_user,
    logout,
    change_password,
    get_all,
    get_one,
    update,
    delete_me,
    bloquer,
    //forgetPassword,
    //resetPasswordLoad
}