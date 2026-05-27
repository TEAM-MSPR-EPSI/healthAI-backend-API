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
    authorRole: {
      type: String,
      default: null,
    },
    authorAvatarUrl: {
      type: String,
      default: null,
    },
    authorAvatarEmoji: {
      type: String,
      default: null,
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
    likes: {
      type: [Number],
      default: [],
    },
    comments: {
      type: [
        new mongoose.Schema(
          {
            authorUserId: { type: Number, required: true },
            authorName: { type: String, required: true },
            authorHandle: { type: String, required: true },
            authorRole: { type: String, default: null },
            authorAvatarUrl: { type: String, default: null },
            authorAvatarEmoji: { type: String, default: null },
            content: { type: String, required: true, trim: true, maxlength: 1000 },
          },
          { _id: true, timestamps: true }
        ),
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'social_posts',
  }
);

socialPostSchema.index({ createdAt: -1 });

module.exports = mongoose.model('SocialPost', socialPostSchema);
