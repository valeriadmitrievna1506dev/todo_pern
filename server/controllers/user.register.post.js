const User = require('../models').User;
const express = require('express');
const router = express.Router();
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

router.post('/users/register', async (req, res, next) => {
  let reqUserData = req.body;
  if (!reqUserData || reqUserData === {}) {
    return next(ApiError.BadRequest('Empty Request'));
  }

  if (reqUserData.password.length < 4)
    return next(ApiError.BadRequest('Password length must be greater than 4'));

  const candidate = await User.findOne({
    where: {
      username: reqUserData.username,
    },
  });
  if (candidate) {
    return next(ApiError.UniqueConstraintError('Username is Taken'));
  }

  const newUser = await User.create({
    username: reqUserData.username,
    password: reqUserData.password,
  });

  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );

  return res
    .status(201)
    .send({ token: token, message: 'Registered successfully' });
});

module.exports = router;
