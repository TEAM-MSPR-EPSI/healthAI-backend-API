const SocialPostService = require('../services/socialPost.service');

class SocialPostController {
  static async list(req, res) {
    try {
      const posts = await SocialPostService.listPosts(req.user?.id || null);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const post = await SocialPostService.createPost({
        userId: req.user.id,
        content: req.body.content,
        file: req.file,
        baseUrl: `${req.protocol}://${req.get('host')}`,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async listMine(req, res) {
    try {
      const posts = await SocialPostService.listUserPosts(req.user.id, req.user.id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const post = await SocialPostService.updatePost(req.params.id, req.user.id, req.user.role, {
        content: req.body.content,
        file: req.file,
        baseUrl: `${req.protocol}://${req.get('host')}`,
      });
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async remove(req, res) {
    try {
      await SocialPostService.deletePost(req.params.id, req.user.id, req.user.role);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async toggleLike(req, res) {
    try {
      const post = await SocialPostService.toggleLike(req.params.id, req.user.id);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addComment(req, res) {
    try {
      const post = await SocialPostService.addComment(req.params.id, req.user.id, req.body.content);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SocialPostController;
