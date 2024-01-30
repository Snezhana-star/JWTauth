const User = require('../models/User')
const mailService = require('../service/mailServise')
const Error = require('../exceptions/ariError')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

class UserService {
    async passwordForgot(email) {
        const finduser = await User.findOne({email})
        if (!finduser) {
            throw Error.BadRequest('Пользователя с таким Email не существует')
        }
        const token = jwt.sign({_id: finduser._id}, process.env.SECRET, {expiresIn: '20m'})
        const link = `http://localhost:4000/api/password-reset/${token}`
        await mailService.sendForgotPasswordMail(email, link);
    }

    async passwordReset(token, newPassword, newPassword2) {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!decodedToken) {
            return res.status(401).json({message: 'Токен не соответствует'})
        }
        const userId = decodedToken._id;
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(401).json({message: 'Пользователь не существует'})
        }
        if (newPassword !== newPassword2) {
            return res.status(401).json({message: 'Пароли не совпадают'})
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 7);
        user.password = hashNewPassword;
        await user.save();
    }
}

module.exports = new UserService()