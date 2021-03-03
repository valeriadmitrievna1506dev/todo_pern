const authMiddleware = require('./../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/users/auth', authMiddleware, async (req, res, next) => {
  const user = req.body;
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY,
    {
      expiresIn: '24h',
    }
  );
  return res.send(token);
});

module.exports = router;
