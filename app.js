const express = require("express");
const { getCategories } = require("./db/controllers/categories-controller.js");
const {
  getReviewsById,
  getReviews,
  patchReviewVotes,
} = require("./db/controllers/reviews-controller.js");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteComment,
} = require("./db/controllers/comments-controller.js");
const { getUsers } = require("./db/controllers/users-controller.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.post("/api/reviews/:review_id/comments", postCommentByReviewId);

app.patch("/api/reviews/:review_id", patchReviewVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getUsers);

app.get("/api", (req, res, next) => {
  res.status(200).json(require("./endpoints.json"));
});

app.use("*", (req, res, next) => {
  res.status(404).send({ msg: "Invalid input" });
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid request" });
  } else if (err.status === 200) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "review doesn't exist" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "bad request" });
  } else if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  } else {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

module.exports = app;
