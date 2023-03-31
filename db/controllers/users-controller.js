const { fetchUsers } = require("../models/users-model.js");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((result) => {
      res.status(200).send({ users: result.rows });
    })
    .catch((err) => {
      next(err);
    });
};
