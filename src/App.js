const express = require("express");

const App = express();


App.use("/test", (req, res) => {
  res.send("routing is also working");
});


App.use("/", (req, res) => {
  res.send("yes it is running");
});

App.listen(3000 ,()=>{
    console.log("server is running on port 3000");
});
