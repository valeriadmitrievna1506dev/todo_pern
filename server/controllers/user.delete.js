const User = require('./../models').User;
const express = require('express');
const router = express.Router();
const auth = require('./../middleware/authMiddleware')

router.delete('/users/:userId', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send({
        message: 'User Not Found',
      });
    }

    await user.destroy();
    res.status(204).send({message: 'User Was Deleted'});
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;