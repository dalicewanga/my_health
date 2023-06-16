const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message_ForumSchema = new Schema({
    contenu: { type: Number, required: true }, 
    date: { type: Date, required: true },
    forum: { type: Schema.Types.ObjectId, ref: "Forum", require: true },
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

const Message_Forum = mongoose.model('Message_Forum', Message_ForumSchema);
module.exports = Message_Forum;
