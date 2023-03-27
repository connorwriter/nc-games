const { fetchCategories } = require("../models/categories-model.js");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((result) => {
      res.status(200).send({ categories: result });
    })
    .catch((err) => {
      next(err);
    });
};
