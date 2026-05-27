const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();

// app.use(express.json());

// app.post("/signup", async (req, res) => {
//   // creating a new instance of user modle

//   const user = new User(req.body);
//   await user.save();

//   res.send("user creaded successfully");
// });
// // finfing one user
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.email;
//   try {
//     await User.find({ email: userEmail });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("user not found");
//   }
// });

// // get all the feed data
app.put("/feed", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kohli",
    email: "Male@gmail.com",
    password: "123456",
    age: 34,
  };
  try {
    await User.create(userObj);
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error creating user");
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
    app.listen(7777, () => {
      console.log("server is running on port 7777");
    });
  })
  .catch(() => {
    console.log("Datatbase is not connected ");
  });
