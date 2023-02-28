const  UserSchema  = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (data, res) => {
    try {
        let { email, password } = data;
        // first to check the email in database
        let user = await UserSchema.findOne({ email: email });
        if (!user) {
            // salt generation
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            data.password = hash;
            await UserSchema.create(data);
            res.status(201).json({
                message: " user Register Successful",
            });
        } else {
            res.status(401).json({
                message: "Email address is already exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
};

 module.exports = register;





// module.exports.register = async (req, res) => {
//     try {
//         let { email, password } = req.body;
//         // first to check the email in database
//         let user = await UserDetails.findOne({ email: email });
//         if (!user) {
//             // salt generation
//             let salt = await bcrypt.genSalt(10);
//             let hash = await bcrypt.hash(password, salt);
//             password = hash;
//             await UserDetails.create(req.body);
//             res.json({
//                 statusCode: 201,
//                 message: " user Register Successfully",
//             });
//         } else {
//             res.json({
//                 statusCode: 401,
//                 message: "Email address is already exists",
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

// const getalluser = async (req, res) => {
//     try {
//         let { name, email, password, isAdmin } = req.body;
//         // sivanathanv1999@gmail.com
//         // first to check the email in database
//         let user = await UserDetails.findOne({ email: email });
//         res.send(user);
//     } catch (error) {
//         res.send(error);
//     }
// };



