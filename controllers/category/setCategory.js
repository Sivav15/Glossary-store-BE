const categorySchema = require("../../models/categoryModal");

const setCategory = async (req, res) => {
  try {

    const { category } =req.body;
    // upperCase first letter
    let v = category.charAt(0).toUpperCase() + category.slice(1);
//check in db
    let value = await categorySchema.findOne({category : v});
    
    if(value){
      res.status(200).json({
        message: "Category is already added",
      });
    }else{
      let data = await categorySchema.create({category : v});
      if (data._id) {
        res.status(201).json({
          message: "Category added successfull",
        });
      } 
    }
  
   

   
  } catch (error) {
    res.status(500).json({
      message: "Category added failled",
    });
  }
};

module.exports = setCategory;
