exports.__esModule = true;
var mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
  pseudo: {type: String, unique: true},
  mail: {type: String, unique: true},
  password: String,
  date: Date,
  admin: Boolean,
  isVerified: {type: Boolean, default: false},
  passwordResetToken: String,
  passwordResetExpires: Date
});
exports.User = mongoose.model('User', exports.userSchema, 'users');
