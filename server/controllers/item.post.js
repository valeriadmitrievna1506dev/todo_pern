const TodoItem = require('./../models').TodoItem;
const express = require('express');
const router = express.Router();

router.post('/users/:userId/tasks', async (req, res) => {
  try {
    let newTask = {
      text: req.body.text,
      done: false,
    };
    if (!req.params.userId) throw new Error(400);
    if (!newTask.text) throw new Error(400);
    const todoItem = await TodoItem.create({
      text: newTask.text,
      done: newTask.done,
      UserId: req.params.userId
    });
    res.status(201).send(todoItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
