const Profile = require("../models/Profile.js");

var express = require("express"),
  router = express.Router(),
  {
    ajouterProfile, updateProfile, deleteProfile
  } = require("../controllers/profile.controller.js");



router.post("/ajouter-profile",ajouterProfile)

router.get('/get-profiles',async (req,res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    // execute query with page and limit values
    const profiles = await Profile.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await Profile.countDocuments();

    // return response with posts, total pages, and current page
    const totalPages = Math.ceil(count / limit)
    const currentPage = page
    res.json(
      {
      profiles,
      totalPages,
      currentPage
      }
    );
  } catch (err) {
    console.error(err.message);
  }

  })

  router.get('/update-profile/:id', async (req, res) => {
    try {
        const profile = await Profile.find({"_id": req.params.id } )
        res.json(profile)
    } catch (error) {
        console.log(error)
    }
   
  })
  router.post('/update-profile/:id', updateProfile)

  router.delete('/delete-profile/:id', deleteProfile)

module.exports = router;