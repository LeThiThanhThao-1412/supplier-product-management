const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/register', (req, res) => {
  res.render('register', { title: 'Đăng ký - SupplierPro' });
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
  res.render('login', { title: 'Đăng nhập - SupplierPro' });
});

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/forgot', (req, res) => {
  res.render('forgot', { title: 'Quên mật khẩu - SupplierPro' });
});

router.post('/forgot', authController.forgotPassword);

module.exports = router;