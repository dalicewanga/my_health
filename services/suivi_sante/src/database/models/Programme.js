const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgrammeSchema = new Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    duree: { type: String },
    exercice: [
        {
            _id: { type: String, require: true },
            rang: { type: Number }, 
            heure_debut: { type: Date, required: true },
            heure_fin: { type: Date },
            staut: { type: String, required: true, enum: ['Pas fait', 'En cours', 'Terminé', 'Annulé'], default: 'Pas fait' },
        }
    ],
    administrateur: {
        _id: { type: String, required: true },
        nom: { type: String, required: true }, 
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
        numero: BigInt,
        adresse: { type: String },
        adresse_mail: { type: String, required: true, unique:true },
        image: { type: String }
    }
},{
    timestamps: true
});

const Programme = mongoose.model('Programme', ProgrammeSchema);
module.exports = Programme;
