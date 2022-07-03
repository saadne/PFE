var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var reclamationSchema = new Schema({
    contact:{
        type:Number,
        required:true
    },
    canal:{
        type:String,
        required:true
    },
    typeDeReclamation:{
        type:String,
        required:true
    },
    dateSaisie:{
        type:Date,
        required:true
    },
    delaiTrt:{ 
        type:String,
        required:true
    },
    entiteSaisie:{
        type:String,
        required:true
    },
    entiteTrt:{
        type:String,
        required:true
    },
    saisiePar:{
        type:String,
        required:true
    },
    etat:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
}) 


module.exports = mongoose.model('Reclamation', reclamationSchema);