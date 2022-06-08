const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {body} = require('express-validator');
const User = require('../model/users');


// POST auth/signup
router.post('/signup',
[
  //email Validation
  body('email').isEmail().withMessage('Please enter valid email')
  .custom((value, {req}) => {
    return User.findOne({email: value}).then( userDoc => {
      if(userDoc) {
        return Promise.reject('E-Mail already exists')
      }
    });
  })
  .normalizeEmail(),
  //password Validation
  body('password').trim().isLength({min: 5}),
  //name Validation
  body('name').trim().not().isEmpty()
],
authController.signUp);

// POST auth/login
router.post('/login', authController.login);

module.exports = router;
