const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const urlController = require('../Controller/UrlController');

//user roots
router.get('/', userController.indexAction);

router.get('/register', userController.registerAction);
router.post('/register', userController.signUpAction);

router.get('/connect', userController.connectAction);
router.post('/connect', userController.loginAction);

router.get('/logout', userController.logoutAction);

//url roots
router.get('/get-urls', urlController.getUrlsAction);
router.put('/add-url', userController.addAction);

router.delete('/remove-url', userController.removeAction);

module.exports = router;