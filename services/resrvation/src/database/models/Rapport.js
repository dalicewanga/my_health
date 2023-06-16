const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RapportSchema = new Schema({
    symtome: { type: String, required: true }, 
    diagnostic: { type: Date, required: true },
    medicament: { type: Date },
    recommandation: { type: Date },
    consultation: { type: Schema.Types.ObjectId, ref: "Consultation", require: true }
},{
    timestamps: true
});

const Rapport = mongoose.model('Rapport', RapportSchema);
module.exports = Rapport;
