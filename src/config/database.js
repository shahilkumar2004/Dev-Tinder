const mongoose = require("mongoose");

const connectDb = async () => {
  return await mongoose.connect(
    "mongodb+srv://kumarshahilrsr771_db_user:8IkqLeSYwdMd6cZH@node-mongo.ntmk86e.mongodb.net/DevTinder"
  );
};

module.exports = connectDb;
