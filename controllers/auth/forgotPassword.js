const  UserSchema  = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


// Forget password send in mail
const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    // first to check the email in database
    let user = await UserSchema.findOne({ email: email });
    if (user) {
      let token = jwt.sign({ id: user._id }, process.env.SECRETKEY, {
        expiresIn: "10m",
      });
      let url = `${process.env.BASE_URL}/password-reset/${user._id}/${token}`;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 993,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAILPASSWORD, // generated ethereal password
        },
      });
      let details = {
        from: "sivanathanv36@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Reset link`, // plain text body
        // html: "<b>Hello world?</b>", // html body
        html: `<div style=" border:3px solid blue; padding : 20px;"><span>Password Reset Link : - </span> <a href=${url}> Click
          here !!!</a>
      <div>
          <h4>
              Note :-
              <ul>
                  <li>This link only valid in 10 minitues</li>
              </ul>
          </h4>
      </div>
  </div>`,
      };

       transporter.sendMail(details);
      res.status(200).json({
        message: "Password Reset link send in your mail",
      });
    } else {
      res.status(401).json({
        message: " Please enter vaild email address",
      });
    }
  } catch (error) {
  
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = forgotPassword;
