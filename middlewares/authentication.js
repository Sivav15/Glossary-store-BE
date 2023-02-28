const jwt = require("jsonwebtoken");

const authentication = (req,res,next)=>{
    let token = req.headers.authorization;
try {
    // check the token in body
    if (token) {
         try {
            let decode = jwt.verify(token, process.env.SECRETKEY)
            if (decode) {
              next();
            }
         } catch (error) {
            res.status(401).json({
                message: "Your session will be expire! Login again", 
              })
         }
        }else{
            res.status(401).json({
                message: "Unauthorized"
              })
        }
} catch (error) {
    res.status(500).json({
        message: "Server side error"
      })
}

}

module.exports = authentication