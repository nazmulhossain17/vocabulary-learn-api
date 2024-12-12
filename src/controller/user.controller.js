const userModel = require("../model/user.model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretToken, name, apiKey, apiSecret } = require("../config");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, secretToken, { expiresIn: "1d" });
};

cloudinary.config({
  cloud_name: name,
  api_key: apiKey,
  api_secret: apiSecret, // Click 'View API Keys' above to copy your API secret
  secure: true
});

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.files?.photo; // Ensure file is being sent in the request

  // Validate input fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Upload photo to Cloudinary if a file is provided
    let photoUrl = "";
    if (file) {
      try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        photoUrl = result.url; // Get the URL of the uploaded image

        // Log the photo URL for debugging purposes
        console.log("Uploaded photo URL:", photoUrl);
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res
          .status(500)
          .json({ message: "Server error: Unable to upload photo." });
      }
    }

    // Create new user
    const user = await userModel.create({
      name,
      email,
      password, // Password will be hashed in the pre-save hook in user schema
      photo: photoUrl
    });

    // Send response with user data and the photo URL
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo // Include the photo URL in the response
    });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error: Unable to register user." });
  }
};

module.exports = { registerUser };
