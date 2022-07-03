var Offre = require('../models/Offre');
require("dotenv").config();

exports.ajouterOffre = (req, res) => {
  const offre = new Offre({
    nom: req.body.nom,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    etat: req.body.etat,
    description: req.body.description
  });

  offre.save((err, offre) => {
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

exports.updateOffre = async (req, res) => {
  try {
    let offreEdited = await Offre.findById(req.params.id)

    if (offreEdited) {
      offreEdited.nom = req.body.nom,
      offreEdited.dateDebut = req.body.dateDebut,
      offreEdited.dateFin =  req.body.dateFin,
      offreEdited.etat = req.body.etat,
      offreEdited.description = req.body.description
      await offreEdited.save()
      return res.json(offreEdited)
    }
} catch (error) {
    res.send(error)
}
}

exports.deleteOffre = async (req, res) => {
  try {
      // const user = await User.findOne({ where: { id: req.params.id } })
      await Offre.deleteOne({
          _id: req.params.id
      });
      return res.json({message:`user deleted ${req.params.id}`})
  } catch (error) {
      return res.status(401).send({ message: "You are unauthorized to delete" })
  }
}


