const Router = require('express').Router;
const AuthController = require('../app/controllers/authController')
const {body} = require('express-validator')
const router = new Router();


router.post('/register',
    body('password').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/),
    AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh-tokens', AuthController.refreshTokens)
router.get('/verify/:link', AuthController.verifyAccount);

module.exports = router