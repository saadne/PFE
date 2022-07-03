const Offre = require("../models/Offre.js");

var express = require("express"),
  router = express.Router(),
  {
    ajouterOffre, updateOffre, deleteOffre
  } = require("../controllers/offre.controller.js");



router.post("/ajouter-offre",ajouterOffre)

router.get('/get-offres',async (req,res) => {
  try{
    const offres = await Offre.find()
    res.json(offres)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.get('/update-offre/:id', async (req, res) => {
  try {
      const user = await Offre.find({"_id": req.params.id } )
      // res.render('authentication/editUser', { title: 'Modifier Utilisateur', user })
      res.json(user)
  } catch (error) {
      console.log(error)
  }
 
})

router.post('/update-offre/:id', updateOffre)

router.delete('/delete-offre/:id', deleteOffre)

module.exports = router;

module.exports = router;