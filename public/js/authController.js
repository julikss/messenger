const User = require('./user');
const Role = require('./role');
const bcrypt = require('bcryptjs');


 class authController{
  async registration(req, res){
    try {
        //res.json("server work")
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: 'Username is already taken'})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: 'USER'})
      const user = new User({username, password: hashPassword, roles:[userRole.value]})
      await user.save();
      return res.json({message:'Successfully'})

    } catch(e) {
      /*console.log(e)
      res.status(400).json({message: 'Registration error'})*/

    }

  }
  async login(req, res){
    try {

    } catch(e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})

    }
  }
  async getUsers(req, res){
    try {
      //const userRole = new Role();
      //const adminRole = new Role({value: 'ADMIN'});
      //await userRole.save();
      //await adminRole.save();
        res.json("server work")
    } catch(e) {

    }

}
}
module.exports = new authController();
