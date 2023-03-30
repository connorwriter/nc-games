const express = require("express");
const { getCategories } = require("../db/controllers/categories-controller.js");
const {
  getReviewsById,
  getReviews,
} = require("../db/controllers/reviews-controller.js");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../db/controllers/comments-controller.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postCommentByReviewId);

app.use("*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid input" });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send(err.msg);
  } else if (err.code === "22P02") {
    res.status(400).send("invalid id");
  } else if (err.status === 200) {
    res.status(err.status).send(err.msg);
  } else if (err.code === "23503") {
    res.status(404).send("review doesn't exist");
  } else if (err.status === 401) {
    res.status(401).send(err.msg);
  } else if (err.code === "23502") {
    res.status(400).send("bad request");
  } else {
    res.status(500).send("Server Error!");
  }
});

module.exports = app;
