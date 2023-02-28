const  UserSchema  = require("../../models/userModel");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')
const imageToBase64 = require('image-to-base64');
const bcrypt = require("bcryptjs");
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});


const profileImage = async(req,res)=>{    
    try {
        const {id} = req.body;
          let user = await UserSchema.findById({_id : id})
     //Step : 1 get the image in frontend to image date, and convert to base 64 format
     let dataUrl = Buffer.from(req.files.image.data).toString('base64')

     // step : 2 get the image in datebase and convert to base 64 format 
     let img = await imageToBase64(user.image);
        if(img == dataUrl){
            res.status(200).json({message : "Profile pic allready updated"})
        }else{
            cloudinary.uploader.destroy(user.public_id)
        let url = `data:${req.files.image.mimetype};base64,${dataUrl}`
            let imageUpload = await  cloudinary.uploader.upload(url,{ folder: "profile" })
         user.image = imageUpload.secure_url,
        user.public_id = imageUpload.public_id,
        await user.save()
        res.status(201).json({message : "Profile pic updated"})
        }
    } catch (error) {
        res.status(500).json({
            message: "Profile pic update failed",
          });
    }

       

}


const profilePic = async(req,res)=>{
  try {
    const {id} = req.params;
    let {image} = await UserSchema.findById({_id : id})
    res.status(200).json(image)
  } catch (error) {
    console.log(error);
  }

    }


    const profileName = async(req,res)=>{
           try {
            const {name,mobile,id} = req.body;
            console.log(id);
            let user = await UserSchema.findById({_id : id})
            // console.log(user);
            user.name = name;
            user.mobile = mobile;
            await user.save();
            res.status(201).json({message : "Update successful"});
           } catch (error) {
            console.log(error);
            res.status(500).json({
                message : "Server error"
            });
           }
    }

    const getProfileName = async(req,res)=>{
try {
    const {id} = req.params;
   const {name,mobile} =  await UserSchema.findById({_id : id})
   res.status(200).json({
    name,
    mobile,
   })
} catch (error) {
    res.status(500).json({
        message : "Server error"
    });
}
    }

    const changePassword = async(req,res)=>{
          try {
            const {oldPassword, newPassword, id} = req.body;
            const user =  await UserSchema.findById({_id : id})
            let compare = await bcrypt.compare(oldPassword, user.password)
            if(compare){
                // salt generation
                     let salt = await bcrypt.genSalt(10);
                     let hash = await bcrypt.hash(newPassword, salt);
                     user.password = hash;
                     await user.save();
                res.status(201).json({message : "Password update successful"});
            }else{
                res.status(400).json({message : "Old password is not match"});
            }
          } catch (error) {
            res.status(500).json({
                message : "Server error"
            });
          }
    }


    const profileDetails = async(req,res)=>{
try {
    const {id} = req.params;
    const {name,image,mobile,address} =  await UserSchema.findById({_id : id})
res.status(200).json({
    message : "success",
    image,
    name,
    mobile,
    address,
})
} catch (error) {
            res.status(500).json({
                message : "Server error"
            });
}
    }
module.exports = {profileImage,profilePic,profileName,getProfileName,changePassword,profileDetails}