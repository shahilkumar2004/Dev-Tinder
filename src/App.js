const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const App = express();

App.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Shahil",
    lastName: "kumar",
    email: "shahil@gmial.com",
    password: "!233",
  };

  // creating a new instance of user modle
  const user = new User(userObj);
  await user.save();

  res.send("user creaded successfully");
});

connectDb()
  .then(() => {
    console.log("Database is connected succesfully");
    App.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Datatbase is not connected ");
  });
