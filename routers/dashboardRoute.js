const express = require('express');
const editCategory = require('../controllers/category/editCategory');
const  getCategory  = require('../controllers/category/getCategory');
const setCategory = require("../controllers/category/setCategory");
const deleteCategory = require("../controllers/category/deleteCategory");
const setProduct = require('../controllers/product/setProduct');
// const upload = require('../middlewares/upload');
const getProduct = require('../controllers/product/getProduct');
const editProduct = require('../controllers/product/editProduct');
const deleteProduct = require('../controllers/product/deleteProduct');
const authentication = require('../middlewares/authentication');
const { dashboardOverview, dashboardProduct, user, orderDetails } = require('../controllers/dashboard');

const router = express.Router();

// Category route
router.post("/setCategory",authentication,setCategory);
router.get("/getCategory",getCategory);
router.get("/getCategory/:q",getCategory);
router.put("/editCategory",authentication,editCategory);
router.delete("/deleteCategory/:id",authentication,deleteCategory);

// ,upload.single("image")

//Product route
router.post("/addProduct",authentication,setProduct);
router.get("/getProduct",getProduct);
router.get("/getProduct/:q",getProduct);
router.put("/editProduct",authentication,editProduct);
router.delete("/deleteProduct/:id",authentication,deleteProduct);


// dashboard route

router.get("/dashboardOverview",dashboardOverview);
router.get("/dashboardProduct",dashboardProduct);
router.get("/order-details",orderDetails);



// user details & order details

router.get("/user",user);



module.exports = router;