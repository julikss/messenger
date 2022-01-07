'use strict';

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secretKey } = {
  secretKey: 'SECRET_KEY_RANDOM'
};

const randomToken = userId => jwt.sign(
  { userId }, secretKey, { expiresIn: '24h' }
);

const registration = async (req, res) => {
  try {
    const registerError = validationResult(req);
    if (!registerError.isEmpty()) {
      return res.status(400).json({ message: 'Error', registerError });
    }

    const { email, username, password } = req.body; //destruction
    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    const hashPassword = bcrypt.hashSync(password, 7);

    if (!registerError.isEmpty() && registerError.registerError[0].param === 'email') {
      return res.status(400).send('Invalid email address. Please try again.');
    }

    const user = new User({ email, username, password: hashPassword });
    await user.save();
    return res.json({ message: 'Successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body; //destruction
    const loggedUser = await User.findOne({ username });

    if (!loggedUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const userPassword = bcrypt.compareSync(password, loggedUser.password);

    if (userPassword) {
      const token = randomToken(loggedUser._id);
      return res.status(400).json({
        token,
        message: 'Correct Password'
      });
    } else {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username, password } = req.params;
    const deleted = await User.deleteOne({ username });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};
const accountUser = async(req, res) => {

  try {
    const { username, password } = req.params; //destruction
    const accountU = await User.findOne({ username });
   res.json({username});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  registration,
  login,
  getUsers,
  deleteUser,
  accountUser
};
