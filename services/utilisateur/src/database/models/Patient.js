const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UtilisateurSchema, Utilisateur } = require("./Utilisateur");


const Patient = Utilisateur.discriminator(
    "Patient",
    new mongoose.Schema({ 
        profession: { type: String, required: true }, 
        temperature: { type: String, default: "" }, 
        poids: { type: String, default: "" }, 
        taille: { type: String, default: "" }, 
        tension_arterielle: { type: String, default: "" }, 
        pouls: { type: String, default: "" }, 
        frequence_respiratoire: { type: String, default: "" }, 
        groupe_sanguin: { type: String, default: "" }, 
        allergie: { type: String, default: "" }, 
        autre: { type: String, default: "" },
        reservation: [
            {
                _id: { type: String, require: true },
                staut: { type: String, required: true, enum: ['En attente', 'Validée', 'Refusée'], default: 'En attente' }, 
                jour: { type: Date, required: true },
                heure_debut: { type: Date, required: true },
                heure_fin: { type: Date,  required: true },
                professionnel: { type: Schema.Types.ObjectId, ref: "Professionnel", require: true }
            }
        ]
    },{
        timestamps: true
    })
);

module.exports = Patient;