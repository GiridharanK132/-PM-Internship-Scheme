const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  education: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  location: { type: String },
  domain: { type: String, enum: ['AI', 'Software', 'Hardware', 'Data Science', 'Cybersecurity'] },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
