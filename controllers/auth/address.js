const  UserSchema  = require("../../models/userModel");
const setAddress = async (req, res) => {
  try {

    const {id, values } =req.body;
let user = await UserSchema.findById(id)
    if(user){
          values.id = user.address.length;
          if(user.address.length <= 1){
            user.address.push(values)
            await user.save()
            res.status(201).json({
              message: "Your address is added",
            });
          }else{
            res.status(200).json({
              message: "Only 2 address will be added",
            });
          }
       
      }else{ 
          res.status(200).json({
            message: "Address added failled",
          });
        
      } 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Address added failled",
    });
  }
};


const getAddress = async (req, res) => {
    try {
      const {id} =req.params;
  let {address} = await UserSchema.findById(id)
  res.status(200).json({
    message: "Address send successfull",
    address,
  });
    } catch (error) {
      res.status(500).json({
        message: "Sommenthing went worng",
      });
    }
  };

  const editAddress = async (req, res) => {
    try {
  console.log(req.body);
      const {firstName, lastName, address, city,state, country, pinCode, mobile, id, user_id} =req.body;
  let user = await UserSchema.findById(user_id)
      if(user){
          user.address[id]={
            firstName, lastName, address, city,state, country, pinCode, mobile, id,
          }
          await user.save()
          res.status(200).json({
            message: "Your address is updated",
          });
        }else{ 
            res.json({
              message: "Address updata failled",
            });
          
        } 
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Address updated failled",
      });
    }
  };

  const deleteAddress = async (req, res) => {
    try {
      const {userId,id} =req.params;
let user = await UserSchema.findById(userId)
if(user){
    user.address.splice(id,1);
    await user.save()
    res.status(200).json({
      message: "Your address is deleted",
    });
  }else{ 
      res.status(200).json({
        message: "Address deleted failled",
      });
    
  } 
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:"Address deleted failled",
      });
    }
  };

module.exports = {setAddress, getAddress, editAddress, deleteAddress};
