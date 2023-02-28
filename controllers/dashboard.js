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


const dashboardProduct = async(req, res)=>{
try {
    const {product,stock} = req.query
    console.log(product);

    let value;
    if(product){
        const data = await productSchema.find();
        value = data.filter((item) => item.product.toLowerCase().includes(product))
    }else if(stock){
        console.log(stock);
        const data = await productSchema.find();
         value = data.filter((item) => item.availableInStock <= stock)
         console.log(value);
    }
    else{
         value = await productSchema.find();
    }
    let data = value.map((item,index)=>{
return{
    product : item.product,
    bought : item.quantity,
    sold : item.sold,
    availableInStock : item.availableInStock, 
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
            value = us.filter((item) => item.name.toLowerCase().includes(user))
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

