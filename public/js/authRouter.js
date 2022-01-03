const express = require('express');
const Router = require('express');
const router = new Router();
const controller = require('./authController')
const { check } = require('express-validator');
const jsonParser = express.json();

router.post('/reg', jsonParser,[
    check('username', "cannot be empty").notEmpty(),
    check('password', "too small/too long").isLength({ min: 4, max: 12 })],
    controller.registration);
router.get('/users', controller.getUsers);

module.exports = router;
