const express = require("express");
const { getCategories } = require("../db/controllers/categories-controller.js");

const app = express();

app.get("/api/categories", getCategories);

app.use("*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid input" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
