const User = require('./user');
const bcrypt = require('bcryptjs');

class authController {
    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'Username is already taken' })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' })
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save();
            return res.json({ message: 'Successfully' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })

        }

    }
    async login(req, res) {
        try {


        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })

        }
    }
    async getUsers(req, res) {
        try {

            res.json("server work")
        } catch (e) {

        }

    }
}

module.exports = new authController();