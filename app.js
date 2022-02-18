const express = require("express");
const router = require("./routes/index");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// initialize the app
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", router);
app.get("/", (req, res) => res.send("Welcome to the Todo App."));

module.exports = app;
