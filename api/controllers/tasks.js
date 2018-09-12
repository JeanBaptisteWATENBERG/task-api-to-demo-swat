'use strict';

const { config } = require('../../config/config')

const createTasks = (req, res) => {
  const body = req.swagger.params.body.value;

  const createdTask = config.repository.insert(body);

  res.json(createdTask);
}

const getTasks = (req, res) => {
  const title = req.swagger.params.title.value;
  const status = req.swagger.params.status.value;

  const tasks = config.repository.getByStatusAndTitle(status, title);

  res.json(tasks);
}

const getTask = (req, res) => {
  const id = req.swagger.params.id.value;
  const task = config.repository.get(id);

  if (!task) {
    res.status = 404;
    return res.json({ message: 'Task not found !' })
  }

  res.json(task);
}

const updateTask = (req, res) => {
  const id = req.swagger.params.id.value;
  const body = req.swagger.params.body.value;
  try {
    const updatedTask = config.repository.update(id, body);

    res.json(updatedTask);
  } catch (e) {
    res.status = 404;
    return res.json({ message: 'Task not found !' })
  }
}

const deleteTask = (req, res) => {
  const id = req.swagger.params.id.value;

  config.repository.delete(id);
  res.status = 204;
}


module.exports = {
  createTasks,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
  config
};