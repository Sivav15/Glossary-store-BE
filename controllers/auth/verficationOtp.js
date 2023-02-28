const fs = require("fs");
const register = require("./register");


const verificationOtp = async(req,res)=>{
 try {
    const {otp,data} = req.body;
    let email = data.email;
    let orginalOtp = 2000
         let oldOtp =   await getOtpBackend(email)
         console.log(oldOtp);
        if(Number(otp) === Number(oldOtp)){
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

const getOtpBackend = async(email)=>{
    let orginalOtp = 0;

  var getData = fs.readFileSync('controllers/auth/otp.json');  
  const info = JSON.parse(getData);
  let v = await info.filter((item)=> {
   if(item.email == email){
       console.log(item.otp);
        orginalOtp = item.otp
       return item.email != email
   }
  return item
  })
  setTimeout(()=>{
    fs.writeFileSync('controllers/auth/otp.json',JSON.stringify(v))
  },5000)
  return orginalOtp ;
}
