// const path = require("path");
// const multer = require("multer");



// const storage = multer.diskStorage({
//     destination: (req,file,callback)=>{
//         callback(null,'./public/image')
//     },
//     filename:(req,file,callback)=>{
//         let ext = path.extname(file.originalname)
//         callback(null,Date.now()+ext)
//     }
// })


// const upload = multer({
//     storage:storage,
//     fileFilter:(req,file,callback)=>{
// if(file.mimetype == "image/png" || file.mimetype == "image/webp"){
//     callback(null,true)
// }else{
//     console.log("only jpg & png files support!");
//     callback(null,false)
// }
//     },
//     limits:{
//         fieldSize: 1024 * 1024 * 2
//     },
    
// })


// module.exports = upload;