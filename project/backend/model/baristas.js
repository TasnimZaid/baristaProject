const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Barista Schema
const baristaSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  bio: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false }, // Default value; to be set based on application status
  balance: { type: Number, default: 0 },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  beverages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beverage' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

// Pre-save hook to set `isApproved` based on `applicationStatus`
baristaSchema.pre('save', async function(next) {
  if (this.isNew) {
    const BaristaAuth = mongoose.model('BaristaAuth'); // Use the model for BaristaAuth
    const baristaAuth = await BaristaAuth.findOne({ baristaId: this._id });

    if (baristaAuth) {
      this.isApproved = baristaAuth.applicationStatus === 'Accept';
    }
  }
  next();
});

const Barista = mongoose.model('Barista', baristaSchema);
module.exports = Barista;