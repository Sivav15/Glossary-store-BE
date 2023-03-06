const fs = require("fs");
const orderSchema = require("../models/orderModal");
const { sendInvoice } = require("./sendMail");



const delivery = async()=>{  

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear(); 
    let time = date.toLocaleTimeString()

    fs.readFile('controllers/data.json', "utf-8", (err, data) => {
       if (err) {
           console.log("error", err);
       } else {

           const info = JSON.parse(data);
           if(info.length > 0){
            info.forEach(async (item) => {
                let order = await orderSchema.findById(item.id);
                order.isdelivery = true;
                order.deliveryTime = `${day}/${month}/${year},${time}`;
                sendInvoice(item.id)
                await order.save();
            });
           }else{
            console.log("info",info);
            return;     
           }

           let vv = info.filter((item) => item.id != item.id);
           fs.writeFile('controllers/data.json', JSON.stringify(vv), (e) => {
               if (e) {
                   console.log(e);
               } else {
                   //    console.log("ggggggggggg");
               }
           });

       }
   })

   console.log("interval stop");
}




module.exports = delivery