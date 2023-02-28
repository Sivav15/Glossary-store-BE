const nodemailer = require("nodemailer");
const fs = require("fs");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 993,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
  });
  
  const sendOtp = async (req,res) => {
try {
  const { email } = req.body
  // console.log(email);
  var otp = Math.floor(1000 + Math.random() * 9000);
    let details = {
      from: "sivanathanv36@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "Confirm your mail id", // Subject line
      text: `Verfication`, // plain text body
      // html: "<b>Hello world?</b>", // html body
      html: `
          <div style="display: flex; justify-content: center;border: 1px solid green; border-radius: 10px;padding: 15px;background-color: green;">
          <div>
              <h2> Your account activate OTP is ${otp} and this otp validation one time</h2>
              
          </div>
  
      </div>
          `,
    };
  
    await transporter.sendMail(details);

     saveOtpBackend(email,otp)
    res.status(200).json({
      message : "Otp send successfull"
    })
} catch (error) {
  console.log(error);
  res.status(500).json({
    message : "Otp send failed"
  })
}
  };

  module.exports = sendOtp


const saveOtpBackend = async(email,otp)=>{
  fs.readFile('controllers/auth/otp.json', "utf-8", (err, data) => {
    if (err) {
        console.log("error", err);
    } else {

        const info = JSON.parse(data);
        let a =  info.filter((item)=> {
          if(item.email == email){
              return item.email != email
          }
         return item
         })

     let v = [...a,{email : email, otp : otp}]
        fs.writeFile('controllers/auth/otp.json', JSON.stringify(v), (e) => {
            if (e) {
                console.log(e);
            } else {
                  //  console.log("ggggggggggg");
            }
        });

    }
})
}

// saveOtpBackend()