const db = require("../connection.js");

exports.fetchCategories = () => {
  let fetchCategoriesQueryString = "SELECT * FROM categories";
  return db.query(fetchCategoriesQueryString).then((result) => {
    return result.rows;
  });
};

exports.checkCategoryExists = (category) => {
  let checkCategoryQueryString = `SELECT * FROM categories WHERE slug = $1;`;
  return db.query(checkCategoryQueryString, [category]).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "category not found" });
    }
  });
};
