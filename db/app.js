const express = require("express");
const { getCategories } = require("../db/controllers/categories-controller.js");
const {
  getReviewsById,
  getReviews,
} = require("../db/controllers/reviews-controller.js");

const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.use("*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid input" });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send(err.msg);
  } else if (err.code === "22P02") {
    res.status(400).send("Please enter a valid review_id");
  } else {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

module.exports = app;
