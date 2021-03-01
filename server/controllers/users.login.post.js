const User = require('../models').User;
const express = require('express');
const router = express.Router();
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt-nodejs');

router.post('/users/login', async (req, res, next) => {
  let reqUserData = req.body.user;
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
  return res.status(200).send(user);
});

module.exports = router;
