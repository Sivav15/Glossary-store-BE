const orderSchema = require("../models/orderModal");
const productSchema = require("../models/productModal");
const {orderPlace, sendInvoice} = require("./sendMail");
const cron = require('node-cron');
const fs1 = require("fs");
const fs = require('fs/promises');
const { otp } = require("./sendSms");
// import { access } from 'fs/promises';
// import { constants } from 'fs';



const order = async (req, res) => {
    let { orderItems } = req.body;
    try {
        const date = new Date();

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
    console.log(id)
    let order = await orderSchema.find({userId : id})
    res.status(200).json({
        message: "success",
        data: order.reverse(),
    })
}


// path.dirname('./data.json')

const calling = async(id)=>{


    // method 1

//     fs1.readFile('controllers/data.json',"utf-8",(err,data)=>{
//         if(err){
//             // console.log("error",err);
//         }else{
//                 const info = JSON.parse(data);
//                 console.log(info);
//                 info.push({
//                    id : id || "gft6547hfdjh5fdgfjd55gfdtj"
//                 })
//            fs1.writeFile('controllers/data.json',JSON.stringify(info),(e)=>{
//                if(e){
//                    console.log(e);
//                }else{
//                 //    console.log("ggggggggggg");
//                }
//                    })
            
//         }
//    })


// method 2 
var getData = fs1.readFileSync('controllers/data.json');  
const info = JSON.parse(getData);
                console.log(info);
                info.push({
                   id : id || "sivanathan"
                })
let setData = fs1.writeFileSync('controllers/data.json',JSON.stringify(info))
// console.log(setData)



// method 3 

    // const data = await fs1.promises.readFile('controllers/data.json')
    //                    .catch((err) => console.error('Failed to read file', err));
  
    // const info = JSON.parse(data);
    //             info.push({
    //                id : "sivanathan"
    //             })
    //             const setData = await fs1.promises.writeFile('controllers/data.json',JSON.stringify(info))
    //             .catch((err) => console.error('Failed to write file', err));
 
}
// calling()
const deliveryArr = async()=>{   
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear(); 
    let time = date.toLocaleTimeString()

    fs1.readFile('controllers/data.json', "utf-8", (err, data) => {
       if (err) {
           console.log("error", err);
       } else {

           const info = JSON.parse(data);
           info.forEach(async (item) => {
               // console.log(item.id);
               let order = await orderSchema.findById(item.id);
               console.log(order);
               console.log("sivanathan",order.isdelivery);
               order.isdelivery = true;
               order.deliveryTime = `${day}/${month}/${year},${time}`;
               await order.save();
           });

        //    sendInvoice()
           let vv = info.filter((item) => item.id != item.id);
           fs1.writeFile('controllers/data.json', JSON.stringify(vv), (e) => {
               if (e) {
                   console.log(e);
               } else {
                   //    console.log("ggggggggggg");
               }
           });

       }
   })
}




setInterval(()=>{
    deliveryArr()
    sendInvoice()
      console.log('running a task every minute');
},30000)

// sendInvoice()
// cron.schedule('* * * * * *', async() => {
  
//     // calling()
//       console.log('running a task every minute');
//     });


module.exports = {order,yourOrders};


// deliveryArr()



