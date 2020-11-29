const express = require("express");
const bosyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const reqAuth = require("./auth");

//Database
const db = require("./db");
db("test");

//Dotenv
require("dotenv").config();

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:5000"
};


//Setting App
const app = express();
app.use(morgan("dev"));
app.use(helmet());

app.use(cors());
app.use(bosyparser.urlencoded({ extended: false }));
app.use(bosyparser.json());
app.use(cookieparser());



//use image up;oads
app.use("/uploads", express.static("uploads"));

//router
// -> route user
app.use("/api/v1/users", require("./routes/UsersRoutes"));


// -> route folder
app.use("/api/v1/folder", require("./routes/FolderRout"));

// -> route files
app.use("/api/v1/files", require("./routes/FilesRout"));


//Connect & Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server start on the port ${port}`));
