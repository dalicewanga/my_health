const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    titre: { type: String, required: true }, 
    contenu: { type: String, required: true },
    image: { type: String, required: true },
    auteur: { type: mongoose.SchemaTypes.ObjectId, required: true }
},{
    timestamps: true
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
