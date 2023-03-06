const orderSchema = require("../models/orderModal");
const productSchema = require("../models/productModal");
const {orderPlace, sendInvoice} = require("./sendMail");
// const cron = require('node-cron');
const fs1 = require("fs");
const delivery = require("./delivery");

// const fs = require('fs/promises');


// import { access } from 'fs/promises';
// import { constants } from 'fs';



const order = async (req, res) => {
    let { orderItems } = req.body;
    try {
        const date = new Date();
// console.log(req.body);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear(); 
        let time = date.toLocaleTimeString()
        // console.log(date.toLocaleString());
        req.body.orderDate = `${day}/${month}/${year},${time}`
        // req.body.deliveryTime = `${day + 1}/${month}/${year},${time}`
        let order = await orderSchema.create(req.body)
        for await (const data of orderItems) {
            let query = data._id;
            const doc = await productSchema.findById(query);
            doc.sold = doc.sold + data.dummyQuantity;
            doc.availableInStock = doc.availableInStock - data.dummyQuantity;
            await doc.save();
        }
        
        orderPlace(order._id,order.orderDate,order.paymentMode,order.address,order.orderItems)
        calling(order._id)
        delivery()
        res.status(201).json({
            message : "Order success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Order failed"
        })
    }
};


const yourOrders = async (req, res)=>{
    const {id} = req.params
    let order = await orderSchema.find({userId : id})
    res.status(200).json({
        message: "success",
        data: order.reverse(),
    })
}


const calling = async(id)=>{
const getData = fs1.readFileSync('controllers/data.json');  
const info = JSON.parse(getData);
                info.push({
                   id : id
                })
 fs1.writeFileSync('controllers/data.json',JSON.stringify(info))
}
module.exports = {order,yourOrders};






