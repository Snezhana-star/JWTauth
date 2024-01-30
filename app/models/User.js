/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 255
 *         surname:
 *           type: string
 *           minLength: 2
 *           maxLength: 255
 *         middlename:
 *           type: string
 *           minLength: 2
 *           maxLength: 255
 *         email:
 *           type: string
 *           format: email
 *           minLength: 2
 *           maxLength: 255
 *         username:
 *           type: string
 *           minLength: 2
 *           maxLength: 15
 *         password:
 *           type: string
 *           minLength: 4
 *         is_confirmed:
 *           type: boolean
 *           default: false
 */
const {Schema,model} = require('mongoose')
const validator = require('validator')
 const User = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 255
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 255
    },
    middlename: {
        type: String,
        required: false,
        minlength: 2,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'invalid email'],
        minlength: 2,
        maxLength: 255
    },
    username: {
        type: String,
        required: false,
        minlength: 2,
        maxLength: 15
    },
    password: {
        type: String,
        required: true,
        // match: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/
    },
    is_confirmed: {
        type: Boolean,
        default: false
    }
});
module.exports = model('User', User)
