//1.Dependencies
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const expressSession = require("express-session");

//Import registration model
//const dashboardForm = require("./Models/DashboardForm");
//const tableData = require("./Models/TableData");
require("dotenv").config();

//Import routes
const indexRoutes = require("./Routes/indexRoutes");
const dashboardRoutes = require("./Routes/dashboardRoutes");
const tableDataRoutes = require("./Routes/tableDataRoutes");

//2.Instantiations
const app = express();
const PORT = 3000;

//3.Configurations
//mongodb settings
//setting up database connections
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log("Mongoose connnection open");
  })
  .on("error", (err) => {
    console.error(`connection error: ${err.message}`);
  });

//Set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views directory

//4. Middleware

// To parse URL encoded data
app.use(express.urlencoded({ extended: false })); //This helps to parse data from forms.
app.use(express.static(path.join(__dirname, "public")));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//5. Routes
//Using imported routes
app.use("/", indexRoutes);
app.use("/", dashboardRoutes);
app.use("/", tableDataRoutes);
//Non existant routes regardless of the method used(get, post, delete) will be caught by this middleware

// This will always be the last endpoint in this file
app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

//6.Bootstrapping server
// This should always be the last line in this file
app.listen(PORT, () => console.log(`listening on port ${PORT}`)); // new