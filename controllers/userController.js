const User = require("../models/users");
const passport = require("passport");
const { hashSync } = require("bcryptjs");
require("../passport");

exports.index = async (req, res, next) => {
  res.render("pages/index", { title: "Express", user: req.user });
};

exports.login_get = async (req, res, next) => {
  res.render("login", { user: req.user });
};

exports.login_post = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("dashboard"); // Redirect to dashboard upon successful login
    });
  })(req, res, next);
};

exports.user_register_get = async (req, res, next) => {
  res.render("signup", { user: req.user });
};

exports.user_register_post = async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
    });
    const result = await user.save();
    console.log(result);
    res.send({ succes: true });
  } catch (err) {
    return next(err);
  }
};

exports.dashboard = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", { user: req.user });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

exports.logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
