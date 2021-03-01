const User = require('./../models').User;
const express = require('express');
const router = express.Router();

router.put('/users/:userId', async (req, res) => {
  try {
    let newUserName = req.body.username
    if (!newUserName) throw new Error(400);
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).send({
        message: 'User Not Found'
    });
    await user.update({
        username: newUserName
    })
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;