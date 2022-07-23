const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  nama: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  jenis_kelamin: String,
  status: String,
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
