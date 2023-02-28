const nodemailer = require("nodemailer");

const sendMail = async(id,date,mode,addresss,orderItems)=>{
    const {firstName, lastName,address,city,state,country, pinCode, mobile,   } = addresss;


    let a = "";

    for(let x of orderItems){
      a+= `<div>
      
      ${x.product}
      <img src = ${x.image} alt=${x.product} /> 
      </div>`
    }

    a+=`

    <div style="display: flex; justify-content: center;border: 1px solid green; border-radius: 10px;padding: 15px;background-color: green;">
    <div>
        <h2>Your order will be placed</h2>
        <h2>order Id : ${id}</h2>
        <h2>order Date : ${date}</h2>
        <h2>Payment type : ${mode}</h2>
        
        <h2>Delivery address : <span>${firstName} ${lastName}, ${address},</span>
            <p>${city} ${state} ${country}.</p>
            <p>Pincode : ${pinCode}</p>
            <p>Mobile number : ${mobile}</p>
        </h2>
    </div>

</div>
    `
    let details = {
        from: "sivanathanv36@gmail.com", // sender address
        to: "siva15vpks@gmail.com", // list of receivers
        subject: "Order Details", // Subject line
        text: `Reset link`, // plain text body
        // html: "<b>Hello world?</b>", // html body


        html:a,
      };
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 993,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAILPASSWORD, // generated ethereal password
        },
      });

      let data = await transporter.sendMail(details)
    //   console.log(data);
    } 

module.exports = sendMail

