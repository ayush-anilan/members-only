const Message = require("../models/messages");

exports.new_message_get = async (req, res, next) => {
  res.render("new_message", { user: req.user });
};

exports.new_message_post = async (req, res, next) => {
  try {
    const message = new Message({
      content: req.body.content,
      author: req.user._id,
    });
    const result = await message.save();
    console.log(result);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};
