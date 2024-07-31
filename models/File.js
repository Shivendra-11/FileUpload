const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  tag: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {


    // transporter

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }


    });

    // send mail 
    let info = await transporter.sendMail({
      from: `codeHelp`,
      to: doc.email,
      subject: "New file uploaded on cloudinary",
      html: `<h2>Hello jee </h2>  <p>file uploaded to the cloudinary  Viwe Here:- <a href="${doc.url}">${doc.url}</a> </p>`

    });

  } catch (error) {

  }
})



const File = mongoose.model("File", fileSchema);
module.exports = File;
