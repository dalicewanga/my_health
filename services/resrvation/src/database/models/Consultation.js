const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsultationSchema = new Schema({
    staut: { type: String, required: true, enum: ['En cours', 'Terminée', 'Annulée'], default: 'En cours' }, 
    jour: { type: Date, required: true },
    heure_debut: { type: Date, required: true },
    heure_fin: { type: Date },
    reservation: { type: Schema.Types.ObjectId, ref: "Reservation", require: true }
},{
    timestamps: true
});

const Consultation = mongoose.model('Consultation', ConsultationSchema);
module.exports = Consultation;
