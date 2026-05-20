const path = require('path');
const SocialPost = require('../models/SocialPost.mongo');
const User = require('../models/User');

const getMediaTypeFromMime = (mimeType) => {
  if (!mimeType) return null;
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return null;
};

class SocialPostService {
  static async listPosts() {
    return SocialPost.find().sort({ createdAt: -1 }).lean();
  }

  static async createPost({ userId, content, file }) {
    const trimmedContent = (content || '').trim();
    if (!trimmedContent && !file) {
      throw new Error('Le post doit contenir du texte ou un media.');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur introuvable.');
    }

    const mediaType = getMediaTypeFromMime(file?.mimetype);
    if (file && !mediaType) {
      throw new Error('Le fichier doit etre une image ou une video.');
    }

    const mediaUrl = file
      ? `${process.env.PUBLIC_API_BASE_URL || 'http://localhost:5000'}/uploads/social/${path.basename(file.path)}`
      : null;

    const post = await SocialPost.create({
      authorUserId: user.user_id,
      authorName: `${user.user_firstname} ${user.user_lastname}`.trim(),
      authorHandle: `@${user.user_username}`,
      content: trimmedContent,
      mediaType,
      mediaUrl,
    });

    return post.toObject();
  }
}

module.exports = SocialPostService;
