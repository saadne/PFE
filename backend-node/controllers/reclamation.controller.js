var Reclamation = require('../models/Reclamation');
require("dotenv").config();

exports.ajouterReclamation = (req, res) => {
  const reclamation = new Reclamation({
    contact: req.body.contact,
    canal: req.body.canal,
    typeDeReclamation: req.body.typeDeReclamation,
    dateSaisie: req.body.dateSaisie,
    delaiTrt: req.body.delaiTrt,
    entiteSaisie: req.body.entiteSaisie,
    entiteTrt: req.body.entiteTrt,
    saisiePar: "Med Souleymane",
    etat: "Encours",
    description: req.body.description
  });

  reclamation.save((err, offre) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Offre registred successfully"
        })
    }
  });
};



exports.updateReclamation = async (req, res) => {
  try {
    let reclamationEdited = await Reclamation.findById(req.params.id)
  
    if (reclamationEdited) {
      reclamationEdited.contact= req.body.contact,
      reclamationEdited.canal= req.body.canal,
      reclamationEdited.typeDeReclamation= req.body.typeDeReclamation,
      reclamationEdited.dateSaisie= req.body.dateSaisie,
      reclamationEdited.delaiTrt= req.body.delaiTrt,
      reclamationEdited.entiteSaisie= req.body.entiteSaisie,
      reclamationEdited.entiteTrt= req.body.entiteTrt,
      reclamationEdited.etat= req.body.etat,
      reclamationEdited.saisiePar= req.body.saisiePar,
      reclamationEdited.escription= req.body.description
      await reclamationEdited.save()
      return res.json(reclamationEdited)
    }
} catch (error) {
    res.send(error)
}
}

exports.deleteReclamation = async (req, res) => {
  try {
      // const user = await User.findOne({ where: { id: req.params.id } })
      await Reclamation.deleteOne({
          _id: req.params.id
      });
      // await Store.destroy({
      //     where: {
      //         added_by: req.body.user_id
      //     }
      // })
      return res.json({message:`reclamation deleted ${req.params.id}`})
  } catch (error) {
      return res.status(401).send({ message: "You are unauthorized to delete" })
  }
}
