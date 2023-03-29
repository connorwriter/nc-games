const db = require("../connection.js");

exports.fetchCommentsByReviewId = (review_id) => {
  let fetchCommentsQueryString =
    "SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC";
  return db.query(fetchCommentsQueryString, [review_id]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({
        status: 200,
        msg: `No comments found for review_id: ${review_id}`,
      });
    }
    return result.rows;
  });
};

exports.checkCommentsExist = async (review_id) => {
  const dbOutput = await db.query(
    "SELECT * FROM comments WHERE review_id = $1;",
    [review_id]
  );

  if (dbOutput.rows.length === 0) {
    // resource does NOT exist
    return Promise.reject({ status: 404, msg: `This review does not exist` });
  }
};
