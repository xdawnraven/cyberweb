const express = require("express");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const initializePassport = require("./passportConfig");
var x = 0;
app.use("/views", express.static('./views/'));

initializePassport(passport);

// Middleware

// Parses details from a form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'css-assets')));
app.set("view engine", "ejs");


// Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
//app.use(flash());

//app.get("/", (req, res) => {
    //res.render("index");
  //});

app.get("/", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  //console.log(req.session.flash.error);
  res.render("login.ejs");
});

app.get("/failed", checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  //console.log(req.session.flash.error);
  res.render("login.ejs");
});


app.get("/views/dashboard", checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated());
  res.render("dashboard", { user: req.user.username });
});


  //req.logout();
  //res.render("index", { message: "You have logged out successfully" });
  //res.redirect("/");

  //req.logout(function(err) {
    //if (err) { return next(err); }
    //res.render("index", { message: "You have logged out successfully" });
    //res.redirect("/");
  //});


app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/views/dashboard", // This is the one that will shown in URL box
    failureRedirect: "/",
    session: false
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/views/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.render("dashboard");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
