const express = require('express');
const { setAddress, getAddress, editAddress, deleteAddress } = require('../controllers/auth/address');
const { profileImage, profilePic, profileName, getProfileName, changePassword, profileDetails } = require('../controllers/auth/profile');
const authentication = require('../middlewares/authentication');


const router = express.Router();

// user
router.post("/addAddress",authentication,setAddress);
router.get("/address/:id",getAddress);
router.put("/editAddress",authentication,editAddress);
router.delete("/deleteAddress/:userId/:id",authentication,deleteAddress);
router.post('/profileImage',authentication,profileImage);
router.get('/profilePic/:id',profilePic)
router.post("/profileName",authentication,profileName)
router.get ("/getProfileName/:id",getProfileName)
router.post("/changePassword",authentication,changePassword);
router.get('/profileDetails/:id',profileDetails)







module.exports = router;