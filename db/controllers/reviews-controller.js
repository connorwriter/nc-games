const {
  fetchReviews,
  fetchReviewsById,
} = require("../models/reviews-model.js");
const { lookForReview } = require("../models/reviews-model.js");

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
  fetchReviews()
    .then((result) => {
      res.status(200).send({ reviews: result });
    })
    .catch((err) => {
      next(err);
    });
};
