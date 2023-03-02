const express = require('express');
const { order, yourOrders } = require('../controllers/order');
const tokenChecker = require('../controllers/tokenCkecker');
const authentication = require('../middlewares/authentication');




const router = express.Router();

// user
router.post("/addOrder",authentication,order);
router.get("/yourOrders/:id",yourOrders);
router.get("/tokenChecker",authentication,tokenChecker);
// router.put("/editAddress",editAddress);
// router.delete("/deleteAddress/:userId/:id",deleteAddress);






module.exports = router;