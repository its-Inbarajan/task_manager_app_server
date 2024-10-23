const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email must not be empty!"],
    },

    phone_number: {
      type: String,
      unique: [true, "Phone number is already exist!"],
      required: [true, "Phone number must not be empty!"],
    },

    password: {
      type: String,
      require: [true, "Password must not be empty!"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
