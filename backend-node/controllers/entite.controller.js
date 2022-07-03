var Entite = require('../models/Entite')
require("dotenv").config();

exports.ajouterEntite = (req, res) => {
  const entite = new Entite({
    nom: req.body.nom,
    role: req.body.role,
    etat: req.body.etat,

  });

  entite.save((err, entite) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Entite registred successfully"
        })
    }
  });
};

exports.updateEntite = async (req, res) => {
  try {
    let entiteEdited = await Entite.findById(req.params.id)

    if (entiteEdited) {
        entiteEdited.nom = req.body.nom,
        entiteEdited.role = req.body.role,
        entiteEdited.etat = req.body.etat,
        await entiteEdited.save()
        return res.json(entiteEdited)
    }
} catch (error) {
    res.send(error)
}
}

exports.deleteEntite = async (req, res) => {
  try {
      // const user = await User.findOne({ where: { id: req.params.id } })
      await Entite.deleteOne({
          _id: req.params.id
      });
      return res.json({message:`user deleted ${req.params.id}`})
  } catch (error) {
      return res.status(401).send({ message: "You are unauthorized to delete" })
  }
}

