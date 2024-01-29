module.exports = class UserDto {
    username;
    email;
    id;
    is_confirmed;

    constructor(model) {
        this.username = model.username
        this.email = model.email
        this.id = model._id
        this.is_confirmed = model.is_confirmed


    }
}
