const Reclamation = require("../models/Reclamation.js");

var express = require("express"),
  router = express.Router(),
  {
    ajouterReclamation, updateReclamation, deleteReclamation
  } = require("../controllers/reclamation.controller.js");



router.post("/ajouter-reclamation",ajouterReclamation)

router.get('/get-reclamations',async (req,res) => {
    const { page = 1, limit = 5 } = req.query;
  
    try {
      // execute query with page and limit values
      const reclamations = await Reclamation.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Reclamation.countDocuments();
  
      // return response with posts, total pages, and current page
      const totalPages = Math.ceil(count / limit)
      const currentPage = page
      res.json(
        {
        reclamations,
        totalPages,
        currentPage
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  })
  router.get('/get-reclamation-search',async (req,res) => {
  
    try {
      // execute query with page and limit values
      const reclamations = await Reclamation.find()
  
      // return response with posts, total pages, and current page
    
      res.json(
        reclamations
      );
    } catch (err) {
      console.error(err.message);
    }
  })

  router.get('/update-rec/:id', async (req, res) => {
    try {
        const user = await Reclamation.find({"_id": req.params.id } )
        // res.render('authentication/editUser', { title: 'Modifier Utilisateur', user })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
   
  })
router.post('/update-rec/:id', updateReclamation)

router.delete('/delete-reclamation/:id', deleteReclamation)

module.exports = router;