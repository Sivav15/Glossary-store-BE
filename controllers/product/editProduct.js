const productSchema = require("../../models/productModal");


const editProduct =  async (req, res) => {
  try {
    const {category,product,rate,quantity,unit,id} = req.body
    const {image} = req.files

    let data = await productSchema.findByIdAndUpdate(id,{
      category,
      product,
      rate,
      quantity,
      unit,
      image,
    });
    if (data._id) {
      res.status(200).json({
        message: "Product edit successfull",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Product edit failled",
      });
  }
};

module.exports = editProduct;










