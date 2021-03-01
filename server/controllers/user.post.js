const User = require('./../models').User;
const express = require('express');
const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    let newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    if (!newUser.username && !newUser.password) throw new Error(400);
    const user = await User.create({
      username: newUser.username,
      password: newUser.password,
    });
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
