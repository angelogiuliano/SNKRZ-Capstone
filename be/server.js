const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = 3001;

const app = express();

// import routes
const sneaksRoute = require("./routes/sneaks");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const checkoutRoute = require("./routes/checkout");

// middlewares
app.use(express.json());
app.use(cors());

app.use("/", sneaksRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", checkoutRoute);

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
