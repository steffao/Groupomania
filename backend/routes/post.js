const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const post = require('../controllers/post');


//-------------Route GET----------
router.get('/', auth, post.getAllPosts);
router.get('/:id', auth, post.getOnePost);

//-------------Route POST----------
router.post('/', auth, multer, post.createPost);

module.exports = router;