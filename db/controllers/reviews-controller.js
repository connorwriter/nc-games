const { checkCategoryExists } = require("../models/categories-model.js");
const {
  fetchReviews,
  fetchReviewsById,
  updateReviewVotes,
  checkReviewExists,
} = require("../models/reviews-model.js");

exports.getReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewsById(review_id)
    .then((result) => {
      res.status(200).send({ review: result[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const { category, sort_by, order } = req.query;
  if (category !== undefined) {
    Promise.all([
      fetchReviews(category, sort_by, order),
      checkCategoryExists(category),
    ])
      .then((result) => {
        if (result[0].length === 0) {
          res.status(200).send({ msg: "no reviews for this category" });
        } else {
          res.status(200).send({ reviews: result[0] });
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    Promise.all([fetchReviews(category, sort_by, order)])
      .then((result) => {
        if (result[0].length === 0) {
          res.status(200).send({ msg: "no reviews for this category" });
        } else {
          res.status(200).send({ reviews: result[0] });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.patchReviewVotes = (req, res, next) => {
  const { review_id } = req.params;
  Promise.all([checkReviewExists(review_id), updateReviewVotes(req)])
    .then((result) => {
      res.status(200).send({ review: result[1] });
    })
    .catch((err) => {
      next(err);
    });
};
