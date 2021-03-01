const TodoItem = require('./../models').TodoItem;
const express = require('express');
const router = express.Router();

router.put('/users/:id/tasks/:idtask', async (req, res) => {
  try {
    const task = req.body;

    if (!task.text && task.done === undefined) {
      return res.status(400).send({
        message: 'Invalid Request Body',
      });
    }

    if (!req.params.id) throw new Error(400);
    if (!req.params.idtask) throw new Error(400);

    const todoItem = await TodoItem.findByPk(req.params.idtask);

    if (!todoItem) {
      return res.status(404).send({
        message: 'Item Not Found',
      });
    }

    await todoItem.update(task);

    res.status(201).send(todoItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
