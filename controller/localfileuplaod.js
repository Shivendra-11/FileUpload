// Import the File model from the models directory
const File = require("../models/File");
const cloudinary = require('cloudinary').v2;
// Define the localfile function to handle file upload
exports.localfile = async (req, res) => {
  try {
    // Fetch the uploaded file from the request object
    const file = req.files.file;

    // Define the path where the file will be saved locally
    // __dirname gives the current directory of this script
    // Date.now() is used to create a unique filename using the current timestamp
    // file.name.split(".")[1] gets the file extension from the original filename
    const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    // Move the file to the specified path
    file.mv(path, (err) => {
      // If there's an error during the file move, log it to the console
      if (err) {
        console.log(err);
      }
    });

    // Send a JSON response back to the client indicating success
    res.json({
      success: true,
      message: "Local file uploaded successfully"
    });

  } catch (error) {
    // If there's any error in the try block, log the error to the console
    console.log(error);

    // Optionally, you can send an error response back to the client
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the file"
    });
  }
};



//ImageUpload handler

exports.imageupload = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const { name, tag, url, email } = req.body;

    // Check if the file is present in the request
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Get the file from the request
    const file = req.files.imageFile;

    // Validate for the supported file types
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format is not supported"
      });
    }

    // Function to upload file to Cloudinary
    const uploadFileToCloudinary = async (file, folder) => {
      const options = { folder };
      return await cloudinary.uploader.upload(file.tempFilePath, options);
    };

    // Upload the file to Cloudinary
    const response = await uploadFileToCloudinary(file, "Babbar");

    // Send success response
  

    // save entry to db 
    const filedata= await File.create({
      name,
      email,
      tags,
      imageurl:response.secure_url

    });

    res.json({
      success: true,
      message: "Video uploaded successfully",
      data: response.secure_url // Including the response from Cloudinary
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


// upload video


exports.videoupload = async (req, res) => {
    // Function to upload file to Cloudinary
    const uploadFileToCloudinary = async (file, folder) => {
      const options = { folder, resource_type: "auto" };
      return await cloudinary.uploader.upload(file.tempFilePath, options);
    };
  try {


    const { name, tag, url, email } = req.body;

    // Check if the file is present in the request
    // if (!req.files || !req.files.imageFile) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No file uploaded"
    //   });
    // }


    const file = req.files.videoFile;

    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".").pop().toLowerCase();

    // Upload the file to Cloudinary
    const response = await uploadFileToCloudinary(file, "Babbar");

    // Send success response
    res.json({
      success: true,
      message: "Video uploaded successfully",
      data: response.secure_url // Including the response from Cloudinary
    });



  } catch (error) {
    console.log(error);
    return res.status(200).json({
      messaage:"Something went wrong"
    })

  }
}