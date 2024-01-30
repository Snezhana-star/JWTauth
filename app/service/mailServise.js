const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'cnega.2002@gmail.com',
                pass: 'dxuf lgam ngmj ukxp',
            }
        })
    }

    async sendVerifiMail(email, link) {
        const mailData = {
            from: 'cnega.2002@gmail.com',
            to: email,
            subject: 'Активация аккаунта',
            html: `<p>Для подтверждения аккаунта перейдите по <a href="${link}">${link}</a></p>`,

        }
        await this.transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }
    async sendForgotPasswordMail(email, link){
        const mailData = {
            from: 'cnega.2002@gmail.com',
            to: email,
            subject: 'Восстановление пароля',
            html: `<p>Для смены пароля перейдите по <a href="${link}">${link}</a></p>`,

        }
        await this.transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }

}

module.exports = new MailService()