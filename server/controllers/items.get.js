const TodoItem = require('./../models').TodoItem;
const express = require('express');
const router = express.Router();

router.get('/users/:userId/tasks', async (req, res) => {
  try {
    const filter = {
      order:
        req.query.order === 'reverse'
          ? [['createdAt']]
          : [['createdAt', 'DESC']],
      where: {
        UserId: parseInt(req.params.userId),
      },
    };

    if (req.query.done)
      filter.where =
        req.query.done === 'done'
          ? { done: true, UserId: parseInt(req.params.userId) }
          : { done: false, UserId: parseInt(req.params.userId) };

    const result = await TodoItem.findAll(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
