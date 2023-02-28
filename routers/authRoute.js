const express = require('express');
const forgotPassword = require('../controllers/auth/forgotPassword');
const login = require('../controllers/auth/Login');
const passwordResetPage = require('../controllers/auth/password-reset-page');
const register = require('../controllers/auth/register');
const sendOtp = require('../controllers/auth/sendOtp');
const verificationOtp = require('../controllers/auth/verficationOtp');


const router = express.Router();

// Auth
router.post("/register",register);
router.post("/login",login);
router.post("/forgotPassword",forgotPassword);
router.post("/passwordResetPage",passwordResetPage);
router.post('/sendOtp',sendOtp);
router.post('/otpVerification',verificationOtp)





module.exports = router;