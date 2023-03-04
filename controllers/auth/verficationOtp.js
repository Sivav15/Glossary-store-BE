const fs = require("fs");
const register = require("./register");


const verificationOtp = async(req,res)=>{
 try {
    const {otp,data} = req.body;
    let email = data.email;
    
         let {orginalOtp,info} =   await getOtpBackend(email)
        if(Number(otp) === Number(orginalOtp)){
          removeOtpBackend(email,info)
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
  let v = await info.map((item)=> {
   if(item.email == email){
        orginalOtp = item.otp
        return;
   }
  })
  return {orginalOtp,info} ;
}
  

const removeOtpBackend = async(email,info)=>{
  let v = await info.filter((item)=> {
    if(item.email == email){
        return false
    }
   return item
   })
    // setTimeout(()=>{
      fs.writeFileSync('controllers/auth/otp.json',JSON.stringify(v))
    // },8000)

}