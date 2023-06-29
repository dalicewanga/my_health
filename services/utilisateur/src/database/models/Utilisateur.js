const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
    nom: { type: String, required: true }, 
    prenom: { type: String, required: true },
    date_naissance: { type: Date, required: true },
    sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
    telephone: { type: Number },
    adresse: { type: String, default: "" },
    adresse_mail: { type: String, required: true, unique:true },
    mot_de_passe: { type: String, required: true },
    image: { type: String },
    is_verified: { type: Boolean, required: true, default: false },
    auth_token: { type: String, default: "" },
    token: { type: String },
    last_login: { type: Date },
    bloque: { type: Boolean, default: false },
    supprime: { type: Boolean, default: false }
  },{
    discriminatorKey: 'role',
    // toJSON: {
    //     transform(doc, ret){
    //         delete ret.password;
    //         delete ret.salt;
    //         delete ret._v;
    //     }
    // },
    timestamps: true
  });

const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = { Utilisateur, UtilisateurSchema };