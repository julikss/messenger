const Router = require('express');
const router = new Router();
const controller = require('./authController')
const { check } = require('express-validator');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

router.post('/registration',
    check('username', "cannot be empty").notEmpty(),
    check('email', "cannot be empty").isEmail(),
    check('password', "too small/too long").isLength({ min: 4, max: 12 }),
    controller.registration);
router.post('/api/login', jsonParser, controller.login);
router.get('/users', controller.getUsers);
router.delete('/delete/:username', controller.deleteUser);

module.exports = router;