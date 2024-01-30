const {validationResult} = require('express-validator');
const Error = require('../exceptions/ariError');
const userService = require('../service/userService');

class UserController {

    async passwordForgot(req, res, next) {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return next(Error.BadRequest('Ошибка валидации'), errors.array())
            }
            const {email} = req.body
            await userService.passwordForgot(email);
            return res.status(200).json({message: 'Инструкции сброщены на указанный Email'})
        } catch (e) {
            next(e)
        }
    }

    async passwordReset(req, res, next) {
        try {
            const errors = validationResult(req.body)
            if (!errors.isEmpty()) {
                return next(Error.BadRequest('Ошибка валидации'), errors.array())
            }
            await userService.passwordReset(req.params.token,req.body.newPassword, req.body.newPassword2)
            return res.status(200).json({message: 'Пароль успешно изменён'})
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()