const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.delete('/', auth, authCtrl.deleteUser);


module.exports = router;