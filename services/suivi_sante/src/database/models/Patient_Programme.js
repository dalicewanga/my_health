const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient_ProgrammeSchema = new Schema({
    duree: { type: String },
    date_debut: { type: Date, required: true },
    date_fin: { type: Date },
    staut: { type: String, required: true, enum: ['En cours', 'Terminé', 'Annulé'], default: 'En cours' }, 
    patient: {
        _id: { type: String, required: true },
        nom: { type: String, required: true }, 
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
        numero: BigInt,
        adresse: { type: String },
        adresse_mail: { type: String, required: true, unique:true },
        image: { type: String },
        profession: { type: String, required: true }, 
        temperature: { type: String, required: true }, 
        poids: { type: String, required: true }, 
        taille: { type: String, required: true }, 
        tension_arterielle: { type: String, required: true }, 
        pouls: { type: String, required: true }, 
        frequence_respiratoire: { type: String, required: true }, 
        groupe_sanguin: { type: String, required: true }, 
        allergie: { type: String, required: true }, 
        autre: { type: String, required: true }, 
    },
    programme: {
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
        ]
    }
},{
    timestamps: true
});

const Patient_Programme = mongoose.model('Patient_Programme', Patient_ProgrammeSchema);
module.exports = Patient_Programme;
