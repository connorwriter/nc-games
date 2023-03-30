const {
  fetchCommentsByReviewId,
  checkCommentsExist,
  createCommentByReviewId,
  removeComment,
  checkCommentExists,
} = require("../models/comments-model");

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;

  Promise.all([
    fetchCommentsByReviewId(review_id),
    checkCommentsExist(review_id),
  ])
    .then((result) => {
      if (result[0].length === 0) {
        res.status(200).send({ msg: "There are no comments for this review" });
      }
      res.status(200).send({ comments: result[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByReviewId = (req, res, next) => {
  const { review_id } = req.params;

  createCommentByReviewId(review_id, req.body)
    .then((result) => {
      res.status(201).send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  Promise.all([checkCommentExists(comment_id), removeComment(comment_id)])
    .then((result) => {
      res.status(204).send({ msg: result });
    })
    .catch((err) => {
      next(err);
    });
};
