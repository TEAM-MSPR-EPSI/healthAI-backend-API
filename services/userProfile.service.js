const fs = require('fs');
const path = require('path');
const UserProfile = require('../models/UserProfile.mongo');
const SocialPost = require('../models/SocialPost.mongo');

const deleteFileIfExists = (fileUrl) => {
  if (!fileUrl) return;
  try {
    const parsed = new URL(fileUrl, process.env.PUBLIC_API_BASE_URL || 'http://localhost:5000');
    const relativePath = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
    const absolutePath = path.join(__dirname, '..', relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch (_) {
    // ignore cleanup failures
  }
};

class UserProfileService {
  static async getAvatar(userId) {
    return UserProfile.findOne({ userId }).lean();
  }

  static async setAvatar(userId, { avatarUrl = null, avatarEmoji = null }) {
    const current = await UserProfile.findOne({ userId });
    const currentUrl = current?.avatarUrl || null;

    if (currentUrl && currentUrl !== avatarUrl) {
      deleteFileIfExists(currentUrl);
    }

    const normalizedEmoji = avatarEmoji && avatarEmoji.trim() ? avatarEmoji.trim() : null;
    const normalizedUrl = avatarUrl || null;

    const updated = await UserProfile.findOneAndUpdate(
      { userId },
      {
        userId,
        avatarUrl: normalizedUrl,
        avatarEmoji: normalizedEmoji,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    const affectedPosts = await SocialPost.find({
      $or: [
        { authorUserId: userId },
        { 'comments.authorUserId': userId },
      ],
    });

    for (const post of affectedPosts) {
      let touched = false;
      if (post.authorUserId === userId) {
        post.authorAvatarUrl = normalizedUrl;
        post.authorAvatarEmoji = normalizedEmoji;
        touched = true;
      }

      post.comments.forEach((comment) => {
        if (comment.authorUserId === userId) {
          comment.authorAvatarUrl = normalizedUrl;
          comment.authorAvatarEmoji = normalizedEmoji;
          touched = true;
        }
      });

      if (touched) {
        await post.save();
      }
    }

    return updated;
  }

  static async attachAvatar(user) {
    if (!user) return user;
    const data = user?.toJSON ? user.toJSON() : { ...user };
    const avatar = await this.getAvatar(data.user_id);
    data.user_avatar_url = avatar?.avatarUrl || null;
    data.user_avatar_emoji = avatar?.avatarEmoji || null;
    return data;
  }
}

module.exports = UserProfileService;
