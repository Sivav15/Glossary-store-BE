const productSchema = require("../../models/productModal");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
     let data = await productSchema.findByIdAndDelete(id)  
    if (data._id) {
      res.status(200).json({
        message: "Product delete successfull",
      });
    } 
  } catch (error) {
    res.status(500).json({
        message: "Product delete failled",
      });
  }
};

module.exports = deleteProduct;
