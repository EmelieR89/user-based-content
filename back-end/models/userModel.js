const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: String,
  password: String,
});

module.exports = mongoose.model('users', userSchema)