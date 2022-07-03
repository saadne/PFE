var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var entiteSchema = new Schema({
  nom: {
    type: String,
    required: [true, "Please specify entite"]
  },
  role: {
    type: String,
    required: [true, "Please specify entite"]
  },
  etat: {
    type: String,
    required: [true, "Please specify entite"]
  },
}) 

module.exports = mongoose.model('Entite', entiteSchema);