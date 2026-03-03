const express = require('express');
const { register, login, getMe } = require('../controller/auth.controller');
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware')
const {registerSchema,loginSchema} = require('../validators/auth.validator')

const router = express.Router();

router.post('/register', validate(registerSchema),register);
router.post('/login', validate(loginSchema),login);
router.get('/me', protect, getMe);

module.exports = router;