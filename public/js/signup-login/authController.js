const User = require('./user');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secretKey } = {
  secretKey: "SECRET_KEY_RANDOM"
};

const randomToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: "24h" })
}

class authController {
  async registration(req, res) {
    try {
     const registerError = validationResult(req);
     if (!registerError.isEmpty()) {
      return res.status(400).json({ message: 'Error', registerError });
     }
     const { username, password, email} = req.body; //destruction
     const candidate = await User.findOne({ username });

     if (candidate) {
      return res.status(400).json({ message: 'Username is already taken' });
     }
     const hashPassword = bcrypt.hashSync(password, 7);

     if (!registerError.isEmpty() && registerError.errors[0].param === 'email') {
      return res.status(400).send('Invalid email address. Please try again.')
     }

     const user = new User({ username, password: hashPassword, email });
     await user.save();
      return res.json({ message: 'Successfully' });

     } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error found' });

      }

    }
    async login(req, res) {
        try {
            const { username, password } = req.body; //destruction
            const loggedUser = await User.findOne({ username });

            if (!loggedUser) {
                return res.status(400).json({ message: 'User not found' });
            }
            const userPassword = bcrypt.compareSync(password, loggedUser.password);
            if (userPassword) {
                return res.status(400).json({ message: 'Correct Password' });
            } else {
                return res.status(400).json({ message: 'Incorrect password' });
            }
            const token = randomToken(loggedUser._id);
            return res.json({ token });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Error found' });

        }
    }
    async getUsers(req, res) {
        try {

            res.json("server work");
        } catch (e) {

        }

    }
}

module.exports = new authController();
