"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: 'User exists',
        lowercase: true,
        trim: true,
        default: '',

    },
    firstName: String,
    lastName: String,
    email: String,
    google: {
        id: String,
        token: String
    },
    created_at: {
        type: Date,
        "default": Date.now
    },
    updated_at: Date
});

userSchema.pre('save', function (next) {
    const curDate = new Date();
    this.updated_at = curDate;
    if (!this.created_at) {
        this.created_at = curDate;
    }

    next();
});

userSchema.methods.findUserByGoogleId = function (id) {
    return this.findOne({'google.id': id});
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
