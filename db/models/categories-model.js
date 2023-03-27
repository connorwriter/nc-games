const db = require("../connection.js");

exports.fetchCategories = () => {
  let fetchCategoriesQueryString = "SELECT * FROM categories";
  return db.query(fetchCategoriesQueryString).then((result) => {
    return result.rows;
  });
};
