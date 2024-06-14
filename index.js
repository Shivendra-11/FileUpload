const express = require("express");
const app = express();

require("dotenv").config();

// port
const PORT = process.env.PORT || 4000;

app.use(express.json());

// file middleware
const fileupload = require("express-fileupload");
app.use(fileupload());

// db connection
const db=require("./config/database");
db();

// cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryconnect();

// api mounting
const upload = require("./routes/fileupload");
app.use('/api/v1/upload', upload);

// app listen
app.listen(4000, () => {
    console.log("App is running at port", PORT);
});
