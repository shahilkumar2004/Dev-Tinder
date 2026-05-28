var validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, password, email } = req.body;

  if (![firstName || lastName]) {
    throw new Error("Enter the correct name");
  } else if (!validator.isEmail(value)) {
    throw new Error("Enter the correct email");
  } else if (!validator.isStrongPassword(value)) {
    throw new Error("password is not strong enough");
  }
};

module.exports = {
  validateSignupData,
};
