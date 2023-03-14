const orderSchema = require("../models/orderModal");
const productSchema = require("../models/productModal");
const UserSchema = require("../models/userModel");

const dashboardOverview = async (req, res) => {
    try {
        const value = await productSchema.find();
        const bought = value.map((item) => item.quantity).reduce((initialValue, currentValue) => initialValue + currentValue);
        const sold = value.map((item) => item.sold).reduce((initialValue, currentValue) => initialValue + currentValue);
        const outOfStock = value.filter((item) => item.availableInStock == 0)
        const totalAvaliableStock = value.map((item) => item.availableInStock).reduce((initialValue, currentValue) => initialValue + currentValue);
        res.status(200).json({
            totalProducts: value.length,
            bought,
            sold,
            outOfStock: outOfStock.length,
            totalAvaliableStock,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Side Error",
        });
    }
}


const dashboardProduct = async (req, res) => {
    try {
        const { product, stock } = req.query

        let value;
        const dBData = await productSchema.find();
        if (product && stock) {
            pro = dBData.filter((item) => item.product.toLowerCase().startsWith(product.toLowerCase()))
            value = pro.filter((item) => item.availableInStock <= stock)
        }
        else if (product) {
            value = dBData.filter((item) => item.product.toLowerCase().startsWith(product.toLowerCase()))
        } else if (stock) {
            value = dBData.filter((item) => item.availableInStock <= stock)
        }
        else {
            value = dBData;
        }
        let data = value.map((item, index) => {
            return {
                product: item.product,
                bought: item.quantity,
                sold: item.sold,
                availableInStock: item.availableInStock,
            }
        })

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Server Side Error",
        });
    }
}


const user = async(req,res)=>{
    try {
        const { user } = req.query;
        let value;
        if(user){
            let us = await UserSchema.find();
            value = us.filter((item) => item.name.toLowerCase().startsWith(user.toLowerCase()))
        }else{
             value = await UserSchema.find();
        }
        let data = value.map((item,index)=>{
            return{
                name : item.name,
                email : item.email,
                address : item.address,
                id : item._id, 
                roll : item.isAdmin
            }
                })
        res.status(200).json(data);
    } catch (error) {
        
    }
}

const orderDetails = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    let order = await orderSchema.find({userId : id})
    
    console.log(order);
    res.status(200).json({
        message: "success",
        data: order.reverse(),
    })
}

module.exports = { dashboardOverview,dashboardProduct,user,orderDetails }

