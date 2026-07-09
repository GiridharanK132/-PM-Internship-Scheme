const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  skills: [{ type: String }],
  location: { type: String },
  duration: { type: String },
  description: { type: String },
  eligibility: { type: String },
  domain: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('internship', InternshipSchema);
