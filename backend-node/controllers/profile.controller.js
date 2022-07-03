var Profile = require('../models/Profile')
require("dotenv").config();

exports.ajouterProfile = (req, res) => {
  const profile = new Profile({
    nom: req.body.nom,
    appelSortant: req.body.appelSortant,
    appelEntrant: req.body.appelEntrant,
    transferIn: req.body.transferIn,
    transferOut: req.body.transferOut,
    smsOut: req.body.smsOut,

  });

  profile.save((err, profile) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Profile registred successfully"
        })
    }
  });
};


exports.updateProfile = async (req, res) => {
  try {
    let profileEdited = await Profile.findById(req.params.id)
    if (profileEdited) {
        profileEdited.nom= req.body.nom,
        profileEdited.appelSortant= req.body.appelSortant,
        profileEdited.appelEntrant= req.body.appelEntrant,
        profileEdited.transferIn= req.body.transferIn,
        profileEdited.transferOut= req.body.transferOut,
        profileEdited.smsOut= req.body.smsOut,
        await profileEdited.save()
        return res.json(profileEdited)
    }
} catch (error) {
    res.send(error)
}
}

exports.deleteProfile = async (req, res) => {
  try {
      await Profile.deleteOne({
          _id: req.params.id
      });
      return res.json({message:`user deleted ${req.params.id}`})
  } catch (error) {
      return res.status(401).send({ message: "You are unauthorized to delete" })
  }
}
