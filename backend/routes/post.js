const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const post = require('../controllers/post');


//-------------Route GET----------
router.get('/', auth, post.getAllPosts);

//-------------Route POST----------
router.post('/', auth, post.createPost);

module.exports = router;