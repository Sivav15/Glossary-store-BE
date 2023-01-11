const categorySchema = require("../../models/categoryModal");

const setCategory = async (req, res) => {
  try {

    const { category } =req.body;
    // let value = await categorySchema.find({category : category});
  
//    let v = category.name.trim()[0].toUpperCase() + category.name.slice(1).toLowerCase()
// console.log(v);
    let data = await categorySchema.create(req.body);
    if (data._id) {
      res.status(201).json({
        message: "Category added successfull",
      });
    } 
  } catch (error) {
    res.status(500).json({
      message: "Category added failled",
    });
  }
};

module.exports = setCategory;
