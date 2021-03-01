const User = require('../models').User;
const express = require('express');
const router = express.Router();

router.get('/allusers', async (req, res) => {
  try {
    const result = await User.findAll({raw: true});
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
