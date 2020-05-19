const bcrypt = require('bcryptjs');
const { model } = require('mongoose');
const baseSchema = require('./base-schema');
const { role } = require('./constants');

const userSchema = baseSchema({
    name: {
        type: String,
        trim: true
    },
    login: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        select: false
    },
    role: {
        type: String,
        trim: true,
        default: role.ADMIN
    }
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

module.exports = model('User', userSchema);
