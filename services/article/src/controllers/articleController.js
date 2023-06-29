const { validationResult } = require('express-validator');
const axios = require('axios');

const Article = require('../database/models/Article')


const create_one = async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    if(!req.file){
        return res.status(400).send({
            msg:'Veuillez charger une image !'
        });
    }

    const titreExist = await Article.findOne({ titre: req.body.titre });
    if(titreExist){
        return res.status(409).send({
            msg:'Un article avec le meme titre exite déjà !'
        });
    }

    try{
        console.log('1111')
        const article = new Article({
            titre: req.body.titre,
            contenu: req.body.contenu,
            image: req.file.filename,
            auteur: req.body.auteur
        });
        await article.save();
        res.status(201).send({ article: article });
    } catch (err) {
        res.status(500).send({ status: "failed", msg: err })
    }
}

const get_one = async (req, res) => {

    const id = req.params.id;
    try{
        const article = await Article.findById(id);
        if(!article) return res.status(404).send({ msg: "Cet article n'existe pas" });
        axios.get("http://127.0.0.1:3001/my_health/utilisateur/get/" + article.auteur).then((response) => {
            var professionnel = {nom: response.data.nom, article: article}
            res.status(200).send(professionnel);
        });
        
    } catch (err) {
        res.status(500).send({ msg: err });
    }

}


module.exports = {
    create_one,
    get_one,
    //verifyMail,
}