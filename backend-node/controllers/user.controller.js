var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

require("dotenv").config();

exports.signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    role: req.body.role,
    entite: req.body.entite,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "User Registered successfully"
        })
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
      username: req.body.username
    })
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "User Not found."
          });
      }
      console.log("----------------------------")
      console.log(req.body.password,user.password)
      console.log("----------------------------")
      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,(err, hash) => {
          console.log(err)
        }
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id
      var token = jwt.sign({
        id: user.id
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      //responding to client request with user profile success message and  access token .
      res.status(200)
        .send({
          user: {
            id: user._id,
            username: user.username,
            fullName: user.fullName,
            role: user.role
          },
          message: "Login successfull",
          accessToken: token,
        });
    });
};

exports.updateUser = async (req, res) => {
  try {
    let userEdited = await User.findById(req.params.id)
    const hash = bcrypt.hashSync(req.body.password, 8);

    if (userEdited) {
        userEdited.fullName = req.body.fullName
        userEdited.username = req.body.username
        userEdited.role = req.body.role
        userEdited.entite = req.body.entite
        if (req.body.password == userEdited.password) {
            userEdited.password = userEdited.password
        } else {
            userEdited.password = hash
        }

        // const match = await bcrypt.compare(userEdited.password, req.body.password)
        // if (userEdited.changed('password')) {
        //     userEdited.password = hash
        // } else {
        //     userEdited.password = userEdited.password
        // }
        await userEdited.save()
        return res.json(userEdited)
    }
} catch (error) {
    res.send(error)
}
}

exports.deleteUser = async (req, res) => {
  try {
      // const user = await User.findOne({ where: { id: req.params.id } })
      await User.deleteOne({
          _id: req.params.id
      });
      // await Store.destroy({
      //     where: {
      //         added_by: req.body.user_id
      //     }
      // })
      return res.json({message:`user deleted ${req.params.id}`})
  } catch (error) {
      return res.status(401).send({ message: "You are unauthorized to delete" })
  }
}