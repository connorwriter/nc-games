const db = require("../connection.js");

exports.fetchReviews = () => {
  let fetchReviewsQueryString = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments on reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`;

  return db.query(fetchReviewsQueryString).then((result) => {
    return result.rows;
  });
};

exports.fetchReviewsById = (review_id) => {
  let fetchReviewsQueryString = "SELECT * FROM reviews";
  const queryParameters = [];

  fetchReviewsQueryString += ` WHERE review_id = $1`;
  queryParameters.push(review_id);

  return db.query(fetchReviewsQueryString, queryParameters).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No review found for review_id: ${review_id}`,
      });
    }
    return result.rows;
  });
};
