const CategorySchema = require("../../models/categoryModal");

const getCategory = async (req, res) => {
    const { q } = req.params
    try {
        let value;
        if (q) {
            data = await CategorySchema.find();
            const keys = ["category"]
            value = data.filter((item) => keys.some((key) => item[key].toLowerCase().startsWith(q)))
        } else {
            value = await CategorySchema.find();
        }
        res.status(200).json({
            message: "success",
            data: value.reverse(),
        })
    } catch (error) {
        console.log(error);
    }
};


module.exports = getCategory;