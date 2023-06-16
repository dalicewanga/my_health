const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    nom_forum: { type: String, required: true }, 
    description: { type: String },
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

const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;
