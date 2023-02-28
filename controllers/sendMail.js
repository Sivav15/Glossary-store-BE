const nodemailer = require("nodemailer");
const orderSchema = require("../models/orderModal");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 993,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.EMAILPASSWORD, // generated ethereal password
  },
});

const orderPlace = async (id, date, mode, addresss) => {
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    country,
    pinCode,
    mobile,
  } = addresss;
  let details = {
    from: "sivanathanv36@gmail.com", // sender address
    to: "siva15vpks@gmail.com", // list of receivers
    subject: "Order place successfull", // Subject line
    text: `Order place successfull`, // plain text body
    // html: "<b>Hello world?</b>", // html body
    html: `
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
        `,
  };

  await transporter.sendMail(details);
};

const sendInvoice = async (id) => {
  let query = "63e0990f4b7e234e3568a70f" || id;
  let order = await orderSchema.findById(query);

  const { orderItems, address, orderDate, paymentMode, amount } = order;
  const { firstName, lastName, city, state, country, pinCode, mobile } =
    address;

  let a = "";

  let b = "";
  for (let [i, x] of orderItems.entries()) {
    b += `<tr>
    <td>
    ${i + 1}
</td>
    <td>
    ${x.product}
</td>
<td>
<img src = ${x.image} alt=${x.product}  style="width:3rem"/> 
</td>
<td>
    ${x.unit}
</td>
<td>
    ${x.dummyQuantity}
</td>
<td style="width:6rem">
   Rs :${"  "}${x.dummyTotal}
</td>
  
</tr>`;
  }

  a += `
<h2 style="text-align: center;">Invoice</h2>
<h3 style="text-align: center;">Invoice id : ${query}</h3>
`;
  a += `
  <table style="width:100%;text-align: center;">
          <tr>
              <th style="width:4rem">
                  #
              </th>
              <th style="width:4rem">
                  Name
              </th>
              <th style="width:4rem">
              Img
          </th>
              <th style="width:3rem">
              Unit
          </th>
              <th style="width:3rem">
              Quantity
          </th>
          <th style="width:3rem">
          Amount
      </th>    
          </tr>
  ${b}
      </table>
  `;

  a += `<div style="display: flex;justify-content: space-around;align-items: center;gap: 20px; width : 100%">
<div style="width:50%">
<h4>Date : ${orderDate} </h4>
<h4>Payment mode : ${paymentMode}</h4>
</div>
<div style="width:50%">
<h4 style="text-align: end;">
Total amount = Rs : ${amount}
</h4>
</div>
</div>`;

  a += `
<div style="display: flex;justify-content: space-around;align-items: center;gap: 20px; width : 100%">
<div style="width:50%">
<h4>From : -</h4>
<div>
<address style="margin-left: 20px;">
            3/55 North street,  <br />
            Chennai 001 india, <br/>
            Pincode : 636341 <br />
            Mobile : 9588339077 <br />
            Email : gstore@gmail.com
          </address>
</div>
</div>
<div style="width:50%;">
<h4 ">To : -</h4>
<address style="margin-left: 20px;">
           ${firstName} ${lastName}, ${order.address.address}, <br />
            ${city} ${state} ${country}, <br/>
            Pincode : ${pinCode} <br />
            Mobile : ${mobile} <br />
          </address>
</div>
</div>
`;
  a += `<h2 style="text-align: center; color : green;">Thank you for shopping, Vist next time</h2>
`;

  let details = {
    from: "sivanathanv36@gmail.com", // sender address
    to: "siva15vpks@gmail.com", // list of receivers
    subject: "Invoice Recipt", // Subject line
    text: `Invoice Recipt`, // plain text body
    html: a,
  };

  await transporter.sendMail(details);
};

module.exports = { orderPlace, sendInvoice };
