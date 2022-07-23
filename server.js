// HTTP server
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

// dotenv ke config
dotenv.config({ path: "config.env" });
// buat PORT
const PORT = process.env.PORT || 8080;
// log request
app.use(morgan("tiny"));

// mongoDB connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set vies engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname,'views/ejs'));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load router
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
