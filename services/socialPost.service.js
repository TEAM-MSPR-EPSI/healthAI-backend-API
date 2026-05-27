const fs = require('fs');
const path = require('path');
const SocialPost = require('../models/SocialPost.mongo');
const User = require('../models/User');
const UserProfileService = require('./userProfile.service');

const getMediaTypeFromMime = (mimeType) => {
  if (!mimeType) return null;
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return null;
};

const getMediaTypeFromFilename = (filename) => {
  const extension = path.extname(filename || '').toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.heic', '.heif', '.tif', '.tiff'].includes(extension)) {
    return 'image';
  }
  if (['.mp4', '.mov', '.m4v', '.avi', '.mkv', '.webm', '.3gp', '.wmv'].includes(extension)) {
    return 'video';
  }
  return null;
};

const getMediaTypeFromFile = (file) => {
  if (!file) return null;
  return getMediaTypeFromMime(file.mimetype) || getMediaTypeFromFilename(file.originalname) || getMediaTypeFromFilename(file.path);
};

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

const buildUserSnapshot = async (user) => {
  const avatar = await UserProfileService.getAvatar(user.user_id);
  return {
    authorUserId: user.user_id,
    authorName: `${user.user_firstname} ${user.user_lastname}`.trim(),
    authorHandle: `@${user.user_username}`,
    authorRole: user.user_role,
    authorAvatarUrl: avatar?.avatarUrl || null,
    authorAvatarEmoji: avatar?.avatarEmoji || null,
  };
};

class SocialPostService {
  static async listPosts(currentUserId = null) {
    const posts = await SocialPost.find().sort({ createdAt: -1 }).lean();
    return posts.map((post) => this.serializePost(post, currentUserId));
  }

  static async listUserPosts(userId, currentUserId = null) {
    const posts = await SocialPost.find({ authorUserId: userId }).sort({ createdAt: -1 }).lean();
    return posts.map((post) => this.serializePost(post, currentUserId));
  }

  static async createPost({ userId, content, file, baseUrl }) {
    const trimmedContent = (content || '').trim();
    if (!trimmedContent && !file) {
      throw new Error('Le post doit contenir du texte ou un media.');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur introuvable.');
    }

    const mediaType = getMediaTypeFromFile(file);
    if (file && !mediaType) {
      throw new Error('Le fichier doit etre une image ou une video.');
    }

    const mediaUrl = file
      ? `${baseUrl || process.env.PUBLIC_API_BASE_URL || 'http://localhost:5000'}/uploads/social/${path.basename(file.path)}`
      : null;

    const author = await buildUserSnapshot(user);

    const post = await SocialPost.create({
      ...author,
      content: trimmedContent,
      mediaType,
      mediaUrl,
    });

    return this.serializePost(post.toObject(), userId);
  }

  static serializePost(post, currentUserId = null) {
    const likedByMe = currentUserId ? (post.likes || []).includes(currentUserId) : false;
    return {
      ...post,
      likeCount: (post.likes || []).length,
      commentCount: (post.comments || []).length,
      likedByMe,
      isAuthorAdmin: post.authorRole === 'admin',
    };
  }

  static async updatePost(postId, userId, userRole, { content, file, baseUrl }) {
    const post = await SocialPost.findById(postId);
    if (!post) {
      throw new Error('Publication introuvable.');
    }

    if (post.authorUserId !== userId && userRole !== 'admin') {
      throw new Error('Action non autorisee.');
    }

    const trimmedContent = (content || '').trim();
    if (!trimmedContent && !file && !post.mediaUrl) {
      throw new Error('Le post doit contenir du texte ou un media.');
    }

    if (file) {
      const mediaType = getMediaTypeFromFile(file);
      if (!mediaType) {
        throw new Error('Le fichier doit etre une image ou une video.');
      }
      deleteFileIfExists(post.mediaUrl);
      post.mediaUrl = `${baseUrl || process.env.PUBLIC_API_BASE_URL || 'http://localhost:5000'}/uploads/social/${path.basename(file.path)}`;
      post.mediaType = mediaType;
    }

    if (trimmedContent) {
      post.content = trimmedContent;
    }

    await post.save();
    return this.serializePost(post.toObject(), userId);
  }

  static async deletePost(postId, userId, userRole) {
    const post = await SocialPost.findById(postId);
    if (!post) {
      throw new Error('Publication introuvable.');
    }

    if (post.authorUserId !== userId && userRole !== 'admin') {
      throw new Error('Action non autorisee.');
    }

    deleteFileIfExists(post.mediaUrl);
    await post.deleteOne();
    return { success: true };
  }

  static async toggleLike(postId, userId) {
    const post = await SocialPost.findById(postId);
    if (!post) {
      throw new Error('Publication introuvable.');
    }

    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex >= 0) {
      post.likes.splice(likedIndex, 1);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return this.serializePost(post.toObject(), userId);
  }

  static async addComment(postId, userId, content) {
    const text = (content || '').trim();
    if (!text) {
      throw new Error('Le commentaire est vide.');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Utilisateur introuvable.');
    }

    const avatar = await UserProfileService.getAvatar(user.user_id);

    const post = await SocialPost.findById(postId);
    if (!post) {
      throw new Error('Publication introuvable.');
    }

    post.comments.push({
      authorUserId: user.user_id,
      authorName: `${user.user_firstname} ${user.user_lastname}`.trim(),
      authorHandle: `@${user.user_username}`,
      authorRole: user.user_role,
      authorAvatarUrl: avatar?.avatarUrl || null,
      authorAvatarEmoji: avatar?.avatarEmoji || null,
      content: text,
    });
    await post.save();
    return this.serializePost(post.toObject(), userId);
  }
}

module.exports = SocialPostService;
