const express = require('express');
const router = express.Router();
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');
const refresh = require('../controllers/auth/refresh');

router.post('/register',register)
router.post('/login', login)
router.post('/refresh',refresh)

export default router;