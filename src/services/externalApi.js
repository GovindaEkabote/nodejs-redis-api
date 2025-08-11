const axios = require('axios');

module.exports = {
  fetchPosts: async () => {
    const response = await axios.get(`${process.env.API_BASE_URL}/posts`);
    return response.data;
  }
};