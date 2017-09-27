"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const crypto = require('crypto');
const owasp = require('owasp-password-strength-test');

owasp.config({
  allowPassphrases: true,
  maxLength: 128,
  minLength: 10,
  minPhraseLength: 20,
  minOptionalTestsToPass: 4
});

const validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  password: { type: String, default: '' },
  salt: String,
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  created_at: {
    type: Date,
    "default": Date.now
  },
  updated_at: Date
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  const curDate = new Date();
  this.updated_at = curDate;
  if (!this.created_at) {
    this.created_at = curDate;
  }

  next();
});

userSchema.pre('validate', function (next) {
  if (this.provider === 'local' && this.password && this.isModified('password')) {
    const result = owasp.test(this.password);
    if (result.errors.length) {
      const error = result.errors.join('');
      this.invalidate('password', error);
    }
  }

  next();
});

userSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
};

userSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
