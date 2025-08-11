const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const cache = require('../middleware/cache');

// Cached route
router.get('/posts', cache('all_posts'), apiController.getPosts);

// Uncached route
router.get('/posts/uncached', apiController.getPosts);

module.exports = router;