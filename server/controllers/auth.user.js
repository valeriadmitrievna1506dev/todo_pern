const User = require('./../models').User;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

router.post('/users/auth', async (req, res) => {
  try {
    let reqUserData = req.body.user;
    console.log(req.body.user);
    if (!reqUserData || reqUserData === {}) {
      console.log('empty body');
      throw new Error(400)
    };
    if (reqUserData.type === 'signIn') {
      const result = await User.findOne({
        where: {
          username: reqUserData.username,
        },
      });
      const { password } = result;

      if (!result) throw new foundError('User Doesnt Exist');
      if (!bcrypt.compareSync(reqUserData.password, password))
      throw new Error(400)
      return res.status(200).send(result);
    }
    if (reqUserData.type === 'signUp') {
      if (reqUserData.password.length < 6)
        return res.status(400).send({
          message: 'Password length must me greater than 6',
        });
      [...(await User.findAll({ raw: true }))].forEach((user) => {
        if (reqUserData.username === user.username) {
          return res.status(400).send({
            message: 'Username is taken',
          });
        }
      });

      const newUser = await User.create({
        username: reqUserData.username,
        password: reqUserData.password,
      });
      return res.status(201).send(newUser);
    }
  } catch (error) {
      res.send(error.message)
  } 
});

module.exports = router;
