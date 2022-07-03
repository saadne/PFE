const User = require("../models/user");

var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/auth.middleware'),
  {
    signup,
    signin,
    updateUser,
    deleteUser
  } = require("../controllers/user.controller.js");

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorised access"
      });
  }
});

router.get('/get-users',async (req,res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    // execute query with page and limit values
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count = await User.countDocuments();

    // return response with posts, total pages, and current page
    const totalPages = Math.ceil(count / limit)
    const currentPage = page
    res.json(
      {
      users,
      totalPages,
      currentPage
      }
    );
  } catch (err) {
    console.error(err.message);
  }
})

router.get('/update-user/:id', async (req, res) => {
  try {
      const user = await User.find({"_id": req.params.id } )
      // res.render('authentication/editUser', { title: 'Modifier Utilisateur', user })
      res.json(user)
  } catch (error) {
      console.log(error)
  }
 
 
})
router.post('/update-user/:id', updateUser)

router.delete('/delete-user/:id', deleteUser)

module.exports = router;