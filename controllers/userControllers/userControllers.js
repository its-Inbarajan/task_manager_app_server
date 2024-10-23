const USER_SCHEMA = require("../../models/usersModels/usersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { genrateToke } = require("../../helper/genrateToken");

const createUsers = async (req, res) => {
  const { full_name, email, password, phone_number } = req.body;

  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Form must not be empty!",
        statusCode: 400,
        success: false,
      });
    }

    // check if given user mail is already exist or not
    const isExist = await USER_SCHEMA.findOne({ email });

    if (isExist) {
      return res.status(400).json({
        message: "User is already exist!",
        statusCode: 400,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await USER_SCHEMA.create({
      full_name,
      email,
      password: hashedPassword,
      phone_number,
    });

    res.status(201).json({
      message: "credentials created successfully!",
      statusCode: 201,
      success: true,
      responses: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};

const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find = await USER_SCHEMA.findOne({ email: email });

    if (!find) {
      return res.status(404).json({
        message: "User Not found!",
        statusCode: 404,
        success: false,
      });
    }

    const checkIsPassMatch = bcrypt.compare(password, find.password);

    if (!checkIsPassMatch) {
      return res.status(404).json({
        message: "User credentials is not match!",
        statusCode: 404,
        success: false,
      });
    }

    const response = {
      userId: find?._id,
      full_name: find?.full_name,
    };

    const token = genrateToke(response);

    res.cookie("token", token);

    res.status(200).json({
      message: `Welcome ${find.full_name}`,
      statusCode: 200,
      success: true,
      responses: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error!",
      statusCode: 500,
      success: false,
      error: error,
    });
  }
};
module.exports = {
  createUsers,
  userSignIn,
  userLogout,
};
