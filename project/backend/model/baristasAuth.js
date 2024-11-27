const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the BaristaAuth Schema
const baristaAuthSchema = new Schema({
  baristaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barista',
    required: true,
  },
  profileImage: String,
  phone: { type: String, required: true },
  culinarySchool: { type: String, required: true },
  bio: { type: String, required: true },
  portfolio: String,
  recommendations: String,
  applicationStatus: { type: String, enum: ['pending', 'Accept', 'Reject'], default: 'pending' },
}, { timestamps: true });

const BaristaAuth = mongoose.model('BaristaAuth', baristaAuthSchema);
module.exports = BaristaAuth;