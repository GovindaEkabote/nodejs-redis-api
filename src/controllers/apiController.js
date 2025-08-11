const axios = require('axios');
const externalApi = require('../services/externalApi');

module.exports = {
  getPosts: async (req, res) => {
    try {
      const data = await externalApi.fetchPosts();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};