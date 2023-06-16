const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    titre: { type: String, required: true }, 
    contenu: { type: String, required: true },
    image: { type: String, required: true },
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
        specialite: { type: String, required: true }
    }
},{
    timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
