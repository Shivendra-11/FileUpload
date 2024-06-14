const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("DB connection successful");
    }).catch((error) => {
        console.log("Mongoose connection failed:", error);
        process.exit(1);
    });
}

module.exports = db;
