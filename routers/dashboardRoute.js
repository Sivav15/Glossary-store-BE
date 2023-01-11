const express = require('express');
const editCategory = require('../controllers/category/editCategory');
const  getCategory  = require('../controllers/category/getCategory');
const setCategory = require("../controllers/category/setCategory");
const deleteCategory = require("../controllers/category/deleteCategory");
const setProduct = require('../controllers/product/setProduct');
const upload = require('../middlewares/upload');
const getProduct = require('../controllers/product/getProduct');

const router = express.Router();

// Category route
router.post("/setCategory",setCategory);
router.get("/getCategory",getCategory);
router.get("/getCategory/:q",getCategory);
router.put("/editCategory",editCategory);
router.delete("/deleteCategory/:id",deleteCategory);

// ,upload.single("image")

//Product route
router.post("/addProduct",setProduct);
router.get("/getProduct",getProduct);
router.get("/getProduct/:q",getProduct);



module.exports = router;