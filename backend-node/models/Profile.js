var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var profileSchema = new Schema({
    nom: {
        type: String,
        enum: ["Agent", "Admin","Chef Agence","Consultant","Marketing",
               "Technicient", "Superviseur"],
        required: [true, "Please specify entite"]
    },
    appelSortant:{
        type:Number,
        required:true
    },
    appelEntrant:{
        type:Number,
        required:true
    },
    transferIn:{
        type:Number,
        required:true
    },
    transferOut:{
        type:Number,
        required:true
    },
    smsOut:{
        type:Number,
        required:true
    }
}) 


module.exports = mongoose.model('Profile', profileSchema);