'use strict';

const uuidv4 = require('uuid/v4');


const normalizedTasks = {};

const createTasks = (req, res) => {
  const body = req.swagger.params.body.value;
  const id = uuidv4();

  const createdTask = {id, ...body};
  normalizedTasks[id] = createdTask;
  res.json(createdTask);
}

const getTasks = (req, res) => {
  const title = req.swagger.params.title.value;
  const status = req.swagger.params.status.value;

  const tasks = Object.keys(normalizedTasks)
  .map(id => normalizedTasks[id])
  .filter(task => {
    let condition = true;
    if (title && title !== '') {
      condition = condition && task.title.includes(title);
    }
    if (status && status !== '') {
      condition = condition && task.status.includes(status);// might be an opportunity for SWAT , includes should be ===
    }

    return condition;
  })

  res.json(tasks);
}

const getTask = (req, res) => {
  const id = req.swagger.params.id.value;
  const task = normalizedTasks[id];

  if (!task) {
    res.status = 404;
    return res.json({message: 'Task not found !'})
  }

  res.json(task);
}

const updateTask = (req, res) => {
  const id = req.swagger.params.id.value;
  const body = req.swagger.params.body.value;

  const task = normalizedTasks[id];

  if (!task) {
    res.status = 404;
    return res.json({message: 'Task not found !'})
  }

  const updatedTask = {...task, ...body};

  // Potential demo of swat not saving updated task in normalizedTask
  normalizedTasks[id] = updatedTask;

  res.json(updatedTask);
}

const deleteTask = (req, res) => {
  const id = req.swagger.params.id.value;

  delete normalizedTasks[id];
  res.status = 204;
}


module.exports = {
  createTasks,
  getTasks,
  updateTask,
  getTask,
  deleteTask
};