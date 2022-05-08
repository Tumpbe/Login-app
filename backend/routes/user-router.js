const express = require('express');

const auth = require('../middleware/auth');
const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/register', UserCtrl.createUser);
router.post('/login', UserCtrl.userLogin);
router.get('/user/:id', auth.checkToken, UserCtrl.getUserById);
router.delete('/user/:id', auth.checkToken, UserCtrl.deleteUser);
router.put('/user/:id', auth.checkToken, UserCtrl.changePassword);
router.get('/logout', UserCtrl.userLogout);

module.exports = router;
