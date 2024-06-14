// Import the File model from the models directory
const File = require("../models/File");

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
