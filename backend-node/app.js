

const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  userRoutes = require("./routers/user.router");
  offreRoutes = require('./routers/offre.router')
  entiteRoutes = require('./routers/entite.router')
  profileRouters = require('./routers/profile.router')
  ReclamationRouters = require('./routers/reclamation.router')
//Connect to database
try {
  mongoose.connect("mongodb://localhost:27017/moov_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

//using user route
app.use(userRoutes);
app.use(offreRoutes)
app.use(entiteRoutes)
app.use(profileRouters)
app.use(ReclamationRouters)


//setup server to listen on port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log("Server is live on port 8080");
})