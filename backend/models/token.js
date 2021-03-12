exports.__esModule = true;
var mongoose = require("mongoose");
exports.tokenSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }//msecondes 12 hours
});
exports.Token = mongoose.model('Token', exports.tokenSchema, 'tokens');
