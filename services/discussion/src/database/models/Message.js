const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    contenu: { type: Number, required: true }, 
    date: { type: Date, required: true },
    recepteur: {
        _id: { type: String, required: true },
        nom: { type: String, required: true }, 
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
        numero: BigInt,
        adresse: { type: String },
        adresse_mail: { type: String, required: true, unique:true },
        image: { type: String },
        role: { type: String, enum: ['Administrateur', 'Professionnel', 'Patient'], required: true }
    },
    emetteur: {
        _id: { type: String, required: true },
        nom: { type: String, required: true }, 
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        sexe: { type: String, enum: ['Masculin', 'Féminin'], required: true },
        numero: BigInt,
        adresse: { type: String },
        adresse_mail: { type: String, required: true, unique:true },
        image: { type: String },
        role: { type: String, enum: ['Administrateur', 'Professionnel', 'Patient'], required: true }
    }
},{
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
