const db = require("../connection.js");

exports.fetchCommentsByReviewId = (review_id) => {
  let fetchCategoriesQueryString =
    "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC";
  return db.query(fetchCategoriesQueryString, [review_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No comments found for review_id: ${review_id}`,
      });
    }
    return result.rows;
  });
};
