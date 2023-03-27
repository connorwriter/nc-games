const db = require("../connection.js");

exports.fetchReviews = (review_id) => {
  let fetchReviewsQueryString = "SELECT * FROM reviews";
  const queryParameters = [];

  if (review_id) {
    fetchReviewsQueryString += ` WHERE review_id = $1`;
    queryParameters.push(review_id);
  }

  return db.query(fetchReviewsQueryString, queryParameters).then((result) => {
    const review = result.rows;
    if (review.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No review found for review_id: ${review_id}`,
      });
    }
    return review;
  });
};
