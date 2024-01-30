/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */
const Router = require('express').Router;
const AuthController = require('../app/controllers/authController')
const UserController = require('../app/controllers/userController')
const {body} = require('express-validator')
const router = new Router();
/**
 * @swagger
 * path:
 *   /auth/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: Successful registration
 *         '400':
 *           description: Invalid input data
 */
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    ],
    AuthController.register
);


router.post('/login', body('email').isEmail(), AuthController.login)

router.post('/logout', AuthController.logout)

router.post('/password-forgot', UserController.passwordForgot);
router.post('/password-reset', UserController.passwordReset);
router.get('/refresh-tokens', AuthController.refreshTokens)
router.get('/verify/:link', AuthController.verifyAccount);

module.exports = router
