const Entite = require("../models/Entite.js");

var express = require("express"),
  router = express.Router(),
  {
    ajouterEntite, updateEntite, deleteEntite
  } = require("../controllers/entite.controller.js");



router.post("/ajouter-entite",ajouterEntite)

router.get('/get-entites',async (req,res) => {

  try {
    // execute query with page and limit values
    const entites = await Entite.find()
    
    res.json(entites);
  } catch (err) {
    console.error(err.message);
  }
  })
  router.get('/get-entitespages',async (req,res) => {
    const { page = 1, limit = 5 } = req.query;
  
    try {
      // execute query with page and limit values
      const entites = await Entite.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Entite.countDocuments();
  
      // return response with posts, total pages, and current page
      const totalPages = Math.ceil(count / limit)
      const currentPage = page
      res.json(
        {
        entites,
        totalPages,
        currentPage
        }
      );
    } catch (err) {
      console.error(err.message);
    }
    })

  router.get('/update-entite/:id', async (req, res) => {
    try {
        const entites = await Entite.find({"_id": req.params.id } )
        res.json(entites)
    } catch (error) {
        console.log(error)
    }
    
  })

  router.post('/update-entite/:id', updateEntite)

  router.delete('/delete-entite/:id', deleteEntite)

module.exports = router;