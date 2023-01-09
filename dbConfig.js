const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        const url = process.env.MONGO_URL;
        mongoose.set("strictQuery", false);
       await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("Database connection successfull");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnection;