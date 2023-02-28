const  UserSchema  = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const passwordResetPage = async (req, res) => {
  try {
    let { id, password } = req.body;
    // hash the password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    req.body.password = hash;
    // update the password in database
    await UserSchema.findByIdAndUpdate(id, {  $set: { password: req.body.password } });
    res.status(201).json({
      message: "Password Reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server errror",
    });
  }
};

module.exports = passwordResetPage;
