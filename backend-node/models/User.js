var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var reclamationSchema = require('./Reclamation')

var userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  username: {
    type: String,
    unique: [true, "username already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "username not provided"],
  },
  role: {
    type: String,
    required: [true, "Please specify user role"]
  },
  entite :{
    type: String,
    required: [true, "Please specify entite"]
  },
  password: {
    type: String,
    required: true
  },

  created: {
    type: Date,
    default: Date.now
  },
  // reclamationCreated:[reclamationSchema],
  // reclamationExtractor:[reclamationSchema],
  // reclamationValidated:[reclamationSchema]
});

module.exports = mongoose.model('User', userSchema);