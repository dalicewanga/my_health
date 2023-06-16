const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UtilisateurSchema, Utilisateur } = require("./Utilisateur");

const Administrateur = Utilisateur.discriminator(
    "Administrateur",
    UtilisateurSchema
);

module.exports = Administrateur;