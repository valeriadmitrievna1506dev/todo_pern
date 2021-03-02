const User = require('../models').User;
const express = require('express');
const router = express.Router();
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


router.post('/users/login', async (req, res, next) => {
  let reqUserData = req.body;
  if (!reqUserData || reqUserData === {}) {
    return next(ApiError.BadRequest('Empty Request'));
  }

  const user = await User.findOne({
    where: {
      username: reqUserData.username,
    },
  });
  if (!user)
    return next(ApiError.BadRequest('User with this username doest exist'));
  const { password } = user;

  if (!bcrypt.compareSync(reqUserData.password, password))
    return next(ApiError.BadRequest('Invalid password'));

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );

  return res.status(201).send(token);
});

module.exports = router;
