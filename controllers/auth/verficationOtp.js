const otpSchema = require("../../models/otpModal");
const register = require("./register");


const verificationOtp = async(req,res)=>{
 try {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    const {otp,data} = req.body;
    let email = data.email;
  
    let orginalOtp = await otpSchema.findOne({email})
        if(Number(otp) === Number(orginalOtp.otp)){
          // await otpSchema.findOneAndDelete({email})
            return await register(data,res)
            res.status(200).json({message : "Otp verified successfull"})
        }else{
            res.status(400).json({message : "Invaild otp"})
        }
 } catch (error) {
    console.log(error);
 }
}
module.exports = verificationOtp
