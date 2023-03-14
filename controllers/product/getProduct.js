const productSchema = require("../../models/productModal");

const getProduct = async (req, res) => {
    const {category, search} = req.query
    try {
        let value;
        let data = await productSchema.find();
        if( category && search){
            let cat = data.filter((item) => item.category === category)
            value = cat.filter((item) => item.product.toLowerCase().startsWith(search.toLowerCase()))
        }else if (category) {
            value = data.filter((item) => item.category === category)
        } else if (search){
            value = data.filter((item) => item.product.toLowerCase().startsWith(search.toLowerCase()))
        } else {
            value = data;
        }
        res.status(200).json({
            message: "success",
            data: value.reverse(),
        }) 
    } catch (error) {
        console.log(error);
    }
};


module.exports = getProduct;