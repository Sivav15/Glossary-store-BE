const categorySchema = require("../../models/categoryModal");

const editCategory = async (req, res) => {
  try {
    const { id,category} = req.body;
     let data = await categorySchema.findByIdAndUpdate(id, { category: category })  
    if (data._id) {
      res.status(200).json({
        message: "Category edit successfull",
      });
    } else {
      res.status(400).json({
        message: "Category edit failled",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = editCategory;
