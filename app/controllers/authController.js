const {validationResult} = require('express-validator');
const authService = require('../service/authService');
const Error = require('../exceptions/ariError');

class AuthController {

    async register(req, res, next) {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return next(Error.BadRequest('Ошибка валидации'), errors.array())
            }
            const {name, surname, middlename, email, username, password} = req.body;
            const user = await authService.register(name, surname, middlename, email, username, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return next(Error.BadRequest('Ошибка валидации'), errors.array())
            }
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async refreshTokens(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async verifyAccount(req, res, next) {
        try {
            const link = req.params.link
            await authService.verifyAccount(link);
            return res.status(200).json({message: 'Аккаунт успешно подтверждён'})
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new AuthController()