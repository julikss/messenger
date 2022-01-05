'use strict';

const { Schema, model } = require('mongoose');

const User = new Schema({
  email: {
    type: String,
    require: true
  },
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = model('User', User);
