const User = require('../models/User')
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('../service/mailServise')
const tokenService = require('../service/tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/ariError')
const md5 = require('md5')

class UserService {
    // async register(name, surname, middlename, email, username, password) {
    //     const finduser = await User.findOne({email})
    //     if (finduser) {
    //         throw ApiError.BadRequest('Email уже используется')
    //     }
    //     const hashPass = await bcrypt.hash(password, 7)
    //     const user = await User.create({name, surname, middlename, email, username, password: hashPass})
    //     await mailService.sendVerifiMail(email, `http://localhost:4000/api/verify/${user._id}`);
    //     const userDto = new UserDto(user)
    //     const tokens = tokenService.generateTokens({...userDto})
    //     await tokenService.saveToken(userDto.id, tokens.refreshToken)
    //     return {
    //         ...tokens, user: userDto
    //     }
    // }
    //
    // async verifyAccount(link) {
    //     const user = await User.findOne({_id: link, is_confirmed: false})
    //     if (!user) {
    //         throw ApiError.BadRequest('Некорректная ссылка')
    //     }
    //     user.is_confirmed = true;
    //
    //     await user.save();
    // }
    // async login(email, password) {
    //     const user = await User.findOne({email})
    //     if (!user) {
    //         throw ApiError.BadRequest('Пользователь с таким email не найден')
    //     }
    //     const isPassEquals = await bcrypt.compare(password, user.password);
    //     if (!isPassEquals) {
    //         throw ApiError.BadRequest('Неверный пароль');
    //     }
    //     const userDto = new UserDto(user);
    //     const tokens = tokenService.generateTokens({...userDto});
    //
    //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //     return {...tokens, user: userDto}
    // }
    //
    // async logout(refreshToken) {
    //     const token = await tokenService.removeToken(refreshToken);
    //     return token;
    // }
    // async refresh(refreshToken) {
    //     if (!refreshToken) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const userData = tokenService.validateRefreshToken(refreshToken);
    //     const tokenFromDb = await tokenService.findToken(refreshToken);
    //     if (!userData || !tokenFromDb) {
    //         throw ApiError.UnauthorizedError();
    //     }
    //     const user = await User.findById(userData.id);
    //     const userDto = new UserDto(user);
    //     const tokens = tokenService.generateTokens({...userDto});
    //
    //     await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //     return {...tokens, user: userDto}
    // }
    async passwordForgot(email) {
        const finduser = await User.findOne({email})
        if (!finduser) {
            throw ApiError.BadRequest('Пользователя с таким Email не существует')
        }
        const hash = `${md5(`${email}${Date.now()}${process.env.SECRET}`)}`
        const link = `http://localhost:4000/api/password-reset/${hash}`
        await mailService.sendForgotPasswordMail(email, link);
    }
    async passwordReset(data){

    }
}

module.exports = new UserService()