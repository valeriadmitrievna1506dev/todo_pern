const User = require('../models').User;
const express = require('express');
const router = express.Router();
const ApiError = require('../error/ApiError');

router.post('/users/register', async (req, res, next) => {
  let reqUserData = req.body.user;
  if (!reqUserData || reqUserData === {}) {
    return next(ApiError.BadRequest('Empty Request'));
  }

  if (reqUserData.password.length < 4)
    return next(ApiError.BadRequest('Password length must be greater than 4'));

  try {
    const newUser = await User.create({
      username: reqUserData.username,
      password: reqUserData.password,
    });

    return res.status(201).send(newUser);
  } catch (err) {
    return next(ApiError.UniqueConstraintError('Username is Taken'))
  }
});

module.exports = router;
