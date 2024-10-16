const express = require('express');
const {authLogin,authRegister, authVerification, tokenverification} = require('../controllers/authController');


const router = express.Router();

router.post('/login', authLogin);
router.post('/register', authRegister);
router.post('/send-verification-email', authVerification);
router.get('/verify-email/:token', tokenverification);
module.exports = router;
