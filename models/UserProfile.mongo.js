const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    avatarEmoji: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'user_profiles',
  }
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
