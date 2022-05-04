const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/auth-admin');
const multer = require('../middleware/multer-config')

const post = require('../controllers/post');
const comment = require('../controllers/comment');


//----------------POSTS-----------

router.get('/', auth, post.getAllPosts);
router.post('/', auth, multer, post.createPost);
router.delete('/:id', auth, multer, post.deletePost);

//----------------COMMENT----------

router.get('/:id/comments', auth, comment.getAllComments);
router.post('/:id/comments', auth, comment.createComment);

module.exports = router;