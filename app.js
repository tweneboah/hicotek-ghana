require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users-route");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const path = require('path');
const app = express();

//DB Connection
const url = process.env.DATABASE_URL_LOCAL|| process.env.DATABASE_URL_LIVE  

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected successfully"));


  //SERVING REACT FILES
  app.use(express.static(path.join(__dirname, 'client/build')));


app.get("/", (req, res) => {
  res.send("HICOTEK GHANA");
});

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//PASSPORT CONGIGURATION
app.use(require('express-session')({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES
app.use("/", userRouter);

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); 


//SERVER
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`The server is runing on port ${PORT}`);
});
