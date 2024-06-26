var express = require("express");
var router = express.Router();
const { body } = require("express-validator");

// Required controller models
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");
const passport = require("passport");

// user routes
router.get("/", user_controller.index);
router.get("/login", user_controller.login_get);
router.post("/login", user_controller.login_post);
router.get("/register", user_controller.user_register_get);
router.post("/register", user_controller.user_register_post);
router.get("/dashboard", user_controller.dashboard);
router.get("/logout", user_controller.logout);

// message routes
router.get("/dashboard/new", message_controller.new_message_get);
router.post("/dashboard/new", message_controller.new_message_post);

module.exports = router;
