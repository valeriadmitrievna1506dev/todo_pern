const User = require('./../models').User;
const TodoItem = require('./../models').TodoItem;
const express = require('express');
const router = express.Router();
const ApiError = require('./../error/ApiError');

router.get('/users/:userId', async (req, res, next) => {
  try {

    const userId = req.params.userId;
    if (typeof parseInt(userId) !== 'number') {
      return next(ApiError.BadRequest('User Id is not a number'))
    }
    if (!userId) return next(ApiError.BadRequest('user id is not defined'));

  
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: TodoItem,
          as: 'TodoItems',
        },
      ],
    });
    if (!user) {
      return next(ApiError.NotFound('User Not Found'))
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
