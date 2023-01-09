const categorySchema = require("../../models/categoryModal");

const setCategory = async (req, res) => {
  try {
    let data = await categorySchema.create(req.body);
    if (data._id) {
      res.status(201).json({
        message: "Category added successfull",
      });
    } else {
      res.status(400).json({
        message: "Category added failled",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = setCategory;
