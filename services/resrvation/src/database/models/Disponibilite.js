const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisponibiliteSchema = new Schema({
    jour: { type: Date, required: true }, 
    heure_debut: { type: Date, required: true },
    heure_fin: { type: Time, required: true },
    professionnel: {
        _id: { type: String, required: true },
        nom: { type: String, required: true }, 
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
        numero: BigInt,
        adresse: { type: String },
        adresse_mail: { type: String, required: true, unique:true },
        image: { type: String },
        specialite: { type: String, required: true }, 
    }

},{
    timestamps: true
});

const Disponibilite = mongoose.model('Disponibilite', DisponibiliteSchema);
module.exports = Disponibilite;
