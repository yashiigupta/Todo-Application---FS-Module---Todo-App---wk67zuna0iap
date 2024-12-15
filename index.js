const fs = require('fs');

const getTodosSync = () => {
  const todos = fs.readFileSync("db.txt", "utf-8");
  return todos;
};

const getTodoSync = (id) => {
  var data = fs.readFileSync("db.txt", "utf-8");
  data = data.split("\n{");
  var todos = [];
  todos.push(JSON.parse(data[0]));
  for(let i = 1; i < data.length; i++) {
    let todo = `{${data[i]}`;
    todos.push(JSON.parse(todo));
  }
  const todo = todos.find(item => item.id === id);
  return JSON.stringify(todo);
};

const createTodoSync = (todo) => {
  const todoItem = {
    "id": Date.now(),
    "title": todo,
    "isCompleted": false,
    "createdAt": new Date().toISOString(),
    "updatedAt": new Date().toISOString()
  }
  fs.appendFileSync("db.txt",  JSON.stringify(todoItem,null,2) + "\n");
};

const updateTodoSync = (id, updates) => {
  var data = fs.readFileSync("db.txt", "utf-8");
  data = data.split("\n{");
  var todos = [];
  todos.push(JSON.parse(data[0]));
  for(let i = 1; i < data.length; i++) {
    let todo = `{${data[i]}`;
    todos.push(JSON.parse(todo));
  }
  var todo = todos.find(item => item.id === id);
  todo = Object.assign(todo, updates);
  todo.updatedAt = new Date().toISOString();
  todo.isCompleted = true;
  fs.writeFileSync("db.txt", "");
  for(let i = 0; i < todos.length; i++) {
    fs.appendFileSync("db.txt",  JSON.stringify(todos[i],null,2) + "\n");
  }
};

const deleteTodoSync = (id) => {
  var data = fs.readFileSync("db.txt", "utf-8");
  data = data.split("\n{");
  var todos = [];
  todos.push(JSON.parse(data[0]));
  for(let i = 1; i < data.length; i++) {
    let todo = `{${data[i]}`;
    todos.push(JSON.parse(todo));
  }
  todos = todos.filter(item => item.id !== id);
  fs.writeFileSync("db.txt", "");
  for(let i = 0; i < todos.length; i++) {
    fs.appendFileSync("db.txt",  JSON.stringify(todos[i],null,2) + "\n");
  }
};

module.exports = {
  getTodosSync,
  getTodoSync,
  createTodoSync,
  updateTodoSync,
  deleteTodoSync,
};
