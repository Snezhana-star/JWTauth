const Router = require('express').Router;
const AuthController = require('../app/controllers/authController')
const UserController = require('../app/controllers/userController')
const {body} = require('express-validator')
const router = new Router();

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/).withMessage('Invalid password format')
    ],
    AuthController.register
);


router.post('/login', body('email').isEmail(), AuthController.login)

router.post('/logout', AuthController.logout)

router.post('/password-forgot', body('email').isEmail(), UserController.passwordForgot);
router.post('/password-reset/:token',
    [
        body('newPassword').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/).withMessage('Invalid password format'),
        body('newPassword2').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/).withMessage('Invalid password format')],
    UserController.passwordReset);
router.get('/refresh-tokens', AuthController.refreshTokens)
router.get('/verify/:link', AuthController.verifyAccount);

module.exports = router
