const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
      // validate(value) {
      //   if (!isAlpha(value)) {
      //     throw new Error(" the string contains only letters (a-zA-Z)");
      //   }
      // },
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 30,
      trim: true,
      // validate(value) {
      //   if (!isAlpha(value)) {
      //     throw new Error(" the string contains only letters (a-zA-Z)");
      //   }
      // },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("you have imputed wrong email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 120,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      validate(value) {
        if (value != "Male" && value != "Female" && value != "Other") {
          throw new Error("you have inputed wrong gender");
        }
      },
    },
    about: {
      type: String,
      default: "this is a Default text in the database",
      trim: true,
      
    },
    skills: {
      type: [String],
      
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// it's class create its own instenses
const userModule = mongoose.model("User", userSchema);
module.exports = userModule;
