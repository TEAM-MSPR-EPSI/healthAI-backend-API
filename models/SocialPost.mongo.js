const mongoose = require('mongoose');

const socialPostSchema = new mongoose.Schema(
  {
    authorUserId: {
      type: Number,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    authorHandle: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
      maxlength: 2000,
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    mediaType: {
      type: String,
      enum: ['image', 'video', null],
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'social_posts',
  }
);

socialPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('SocialPost', socialPostSchema);
