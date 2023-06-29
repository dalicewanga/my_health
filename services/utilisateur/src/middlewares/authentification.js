const jwt = require('jsonwebtoken');

const {Utilisateur} = require('../database/models/Utilisateur');
const { JWT_SECRET } = process.env;

const authentification = async (req, res, next) => {

    try{
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decode = jwt.verify(authToken, JWT_SECRET);
        const utilisateur = await Utilisateur.findOne({ _id: decode._id, auth_token: authToken });
        
        if (!utilisateur) throw new Error();

        req.authToken = authToken;
        req.utilisateur = utilisateur;
        next();
    } catch (err) {
        res.status(401).send({ msg: "Token invalide, merci de vous authentifier!" });
    }

}

module.exports = authentification;