const {Utilisateur} = require('../database/models/Utilisateur')
const jwt = require('jsonwebtoken');

const authentification = async (req, res) => {

    try{
        const authToken = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(authToken, JWT_SECRET);
        const utilisateur = await Utilisateur.findOne({ _id: decode._id, auth_token: authToken });
        if(!utilisateur){
            res.status(401).send({ msg: "Token invalide" });
        }
        next();
    } catch (err) {
        res.status(400).send({ msg: err });
    }

}

module.exports = authentification;