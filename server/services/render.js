const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // membuat dan get request ke /api/users
  axios
    .get("http://localhost:3000/api/users")
    .then(function (respone) {
      // console.log(respone.data);
      res.render("index", { users: respone.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

// tambah user form
exports.add_user = (req, res) => {
  res.render("add_user");
};

// update user form
exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function (userdata) {
      res.render("update_user", { user: userdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
