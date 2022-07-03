var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var offreSchema = new Schema({
  nom: {
    type: String,
    required: [true, "fullname not provided "],
  },
  dateDebut: {
    type: Date,
  },
  dateFin: {
    type: Date,
  },
  etat: {
    type: String,
  },
  description: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Offre', offreSchema);