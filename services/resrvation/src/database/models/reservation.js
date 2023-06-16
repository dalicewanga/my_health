const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    staut: { type: String, required: true, enum: ['En attente', 'Validée', 'Refusée'], default: 'En attente' }, 
    jour: { type: Date, required: true },
    heure_debut: { type: Date, required: true },
    heure_fin: { type: Date,  required: true },
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

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation;
