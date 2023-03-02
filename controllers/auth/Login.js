const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  UserSchema  = require("../../models/userModel");

const login = async (req, res) => {

    try {
        let { email, password } = req.body;
        // first to check the email in database
        let user = await UserSchema.findOne({ email: email });
        if (user) {
            // compare the two password
            let compare = await bcrypt.compare(password, user.password)
            if (compare) {
                let token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "10m" });
                res.json({
                    statusCode: 201,
                    message: "login successfully",
                    token,
                    id : user._id,
                    isAdmin : user.isAdmin,
                    name : user.name,
                    email : user.email,
                    mobile : user.mobile,                  
                })
            } else {
                res.json({
                    statusCode: 401,
                    message: "Password is Wrong"
                })
            }
        } else {
            res.json({
                statusCode: 401,
                message: "Invaild Email "
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            statusCode: 500,
            message: "Internal Server Error",
            error
        })
    }

}

module.exports = login