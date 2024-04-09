const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = 3001;

const app = express();

// import routes


// middlewares
app.use(express.json());
app.use(cors());

// db
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Db connection error"));
db.once("open", () => {
  console.log("Db succesfully connected");
});

app.listen(port, () => {
  console.log(`Server connected and listening on port ${port}`);
});
