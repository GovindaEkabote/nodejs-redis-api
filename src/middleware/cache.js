const redisClient = require('../config/redis');

const cache = (key, ttl = 3600) => {
  return async (req, res, next) => {
    const cacheKey = key || req.originalUrl;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log('Serving from cache');
        return res.json(JSON.parse(cachedData));
      }

      // Override res.json to cache responses
      const originalJson = res.json;
      res.json = (data) => {
        redisClient.setEx(cacheKey, ttl, JSON.stringify(data));
        originalJson.call(res, data);
      };

      next();
    } catch (err) {
      console.error('Cache middleware error:', err);
      next();
    }
  };
};

module.exports = cache;