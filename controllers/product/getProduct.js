const productSchema = require("../../models/productModal");

const getProduct = async (req, res) => {
    const {category, product, search} = req.query
    try {
        console.log(search);
        let value;

        if(search){
            data = await productSchema.find();
            value = data.filter((item) => item.product.toLowerCase().includes(search))
        }else if (category) {
            console.log(category);
            data = await productSchema.find();
            value = data.filter((item) => item.category === category)
        } else if (category && search){
            data = await productSchema.find();
            let cat = data.filter((item) => item.category === category)
            value = cat.filter((item) => item.product.toLowerCase().includes(search))
        } else {
            value = await productSchema.find();
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