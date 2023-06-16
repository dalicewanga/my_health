const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UtilisateurSchema, Utilisateur } = require("./Utilisateur");


const Professionnel = Utilisateur.discriminator(
    "Professionnel",
    new mongoose.Schema({ 
        specialite: { type:String, require: true },
        administrateur: { type: Schema.Types.ObjectId, ref: "Administrateur", require: true },
        disponibilite: [
            {
                _id: { type: String, require: true },
                jour: { type: Date, required: true }, 
                heure_debut: { type: Date, required: true },
                heure_fin: { type: Date, required: true },
            }
        ],
        reservation: [
            {
                _id: { type: String, require: true },
                staut: { type: String, required: true, enum: ['En attente', 'Validée', 'Refusée'], default: 'En attente' }, 
                jour: { type: Date, required: true },
                heure_debut: { type: Date, required: true },
                heure_fin: { type: Date,  required: true },
                patient: { type: Schema.Types.ObjectId, ref: "Patient", require: true }
            }
        ],
        article: [
            {
                _id: { type: String, require: true },
                titre: { type: String, required: true }, 
                contenu: { type: String, required: true },
                image: { type: String, required: true },
            }
        ]
    }, { timestamps: true })
);

module.exports = Professionnel;