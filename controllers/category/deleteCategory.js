const categorySchema = require("../../models/categoryModal");

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
     let data = await categorySchema.findByIdAndDelete(id)  
    if (data._id) {
      res.status(200).json({
        message: "Category delete successfull",
      });
    } 
  } catch (error) {
    res.status(500).json({
      message: "Category delete failled",
    });
  }
};

module.exports = deleteCategory;
