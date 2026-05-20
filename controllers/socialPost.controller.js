const SocialPostService = require('../services/socialPost.service');

class SocialPostController {
  static async list(req, res) {
    try {
      const posts = await SocialPostService.listPosts();
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
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SocialPostController;
