const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/auth-admin');
const multer = require('../middleware/multer-config')

const post = require('../controllers/post');



//-------------Route GET----------
router.get('/', auth, post.getAllPosts);

//-------------Route POST----------
router.post('/', auth, multer, post.createPost);

router.put('/', authAdmin, post.togglePost);

module.exports = router;