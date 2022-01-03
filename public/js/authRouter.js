const Router = require('express');
const router = new Router();
const controller = require('./authController')
const { check } = require('express-validator');


router.post('/registration', [
    check('username', "cannot be empty").notEmpty(),
    check('password', "too small/too long").isLength({ min: 4, max: 12 })],
    controller.registration);
router.get('/users', controller.getUsers);

module.exports = router;
