const { Schema, model } = require('mongoose');

const User = new Schema({

    username: {
        type: String,
        unique: true,
        require: true
    },

<<<<<<< HEAD
    password: {
        type: String,
        require: true
    },
=======
  password:{
   type: String,
   require: true}

>>>>>>> 6c287f9e00a71a03db04f870e561c0f67b5cc19f

});

module.exports = model('User', User);