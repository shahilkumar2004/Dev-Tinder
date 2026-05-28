const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();
const { validateSignupData } = require("./utils/validation");
// app.use(express.json());

app.post("/signup", async (req, res) => {
  // step-> Validate the data
  try {
    validateSignupData(req);
    // step-> Encrypt the password
    // step-> creating a new instance of user modle
    const user = new User(req.body);

    await user.save();
    res.send("user creaded successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// // finfing one user

app.patch("/user", async (req, res) => {
  try {
    await User.updateMany(req.body);
    res.send(user);
  } catch (err) {
    res.status(400).send("user not found");
  }
});

// // get all the feed data
app.put("/feed", async (req, res) => {
  const userObj = {
    firstName: "Aarav",
    lastName: "Verma",
    email: "aarav.verma@example.com",
    password: "CodeMaster@456",
    age: 22,
    gender: "Male",
    skills: ["JavaScript", "Express.js", "Python", "SQL", "Git"],
  };
  try {
    await User.create(userObj);
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

// app.get("/feed", async (req, res) => {
//   try {
//     res.send("connected");
//   } catch (err) {
//     res.status(400).send("Error creating user");
//   }
// });

connectDb()
  .then(() => {
    console.log("Database is connected succesfully");
    app.listen(4000, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Datatbase is not connected ");
  });
