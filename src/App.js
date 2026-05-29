const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validateSignupData } = require("./utils/validation");

const app = express();

// need midleware to parse the json
app.use(express.json());
// need midleware to parse the cokkies
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  // step-> Validate the data
  try {
    const { firstName, lastName, email, password, age, gender, about, skills } =
      req.body;
    validateSignupData(req);
    // step-> Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // step-> creating a new instance of user modle
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,

      skills,
    });

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isEmailPresent = await User.findOne({ email: email });
    if (!isEmailPresent) {
      throw new Error("Email is not present in the database");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // create a jwt token
      const token = await JsonWebTokenError.sign(
        { _id: user._id },
        "DevTinder@123"
      );
      // add te token to cokkie and send the response back to the user
      res.cookie("token", token);

      res.send("login successfuly");
    } else {
      throw new Error("Invalid password");
    }
    res.send("Login successful");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
      throw new Error("Invalid Token");
    }
    // validate the token
    const decodedMessage = await jwt.verify(token, "DevTinder@123");

    const user = await User.findById(decodedMessage);

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

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
