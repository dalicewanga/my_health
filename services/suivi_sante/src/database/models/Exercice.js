const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciceSchema = new Schema({
    rang: { type: Number }, 
    heure_debut: { type: Date, required: true },
    heure_fin: { type: Date },
    staut: { type: String, required: true, enum: ['Pas fait', 'En cours', 'Terminé', 'Annulé'], default: 'Pas fait' },
    programme: { type: Schema.Types.ObjectId, ref: "Programme", require: true },
},{
    timestamps: true
});

const Exercice = mongoose.model('Exercice', ExerciceSchema);
module.exports = Exercice;
