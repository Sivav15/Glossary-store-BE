const productSchema = require("../../models/productModal");

const getProduct = async (req, res) => {
    const { q } = req.params
    try {
        let value;
        if (q) {
            data = await productSchema.find();
            const keys = ["category","product"]
            value = data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)))
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