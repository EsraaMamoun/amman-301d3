'use strict';
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override'); //new
const app = express();
const PORT = process.env.PORT;
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (err) => console.log(err));
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); //new
app.use(express.static('./public'));
//view engine
app.set('view engine', 'ejs');
//api's

app.get('/', getTasks);
app.get('/tasks/:task_id', getOneTask);
app.get('/add', getForm);
app.post('/add', addTask);
app.put('/update/:task_id', updateTask);
app.delete('/delete/:task_id', deleteTask);
app.use('*', notFoundHandler);

function getTasks(req, res) {
  const SQL = 'SELECT * FROM tasks;';
  client
    .query(SQL)
    .then((results) => {
      res.render('index', { tasks: results.rows });
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}
function getOneTask(req, res) {
  const SQL = 'SELECT * FROM tasks WHERE id=$1;';
  const values = [req.params.task_id];
  client
    .query(SQL, values)
    .then((results) => {
      res.render('pages/detail-view', { task: results.rows[0] });
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}
function getForm(req, res) {
  res.render('pages/add-view');
}
function addTask(req, res) {
  const { title, description, category, contact, status } = req.body;
  const SQL =
    'INSERT INTO tasks (title,description,contact,status,category) VALUES ($1,$2,$3,$4,$5);';
  const values = [title, description, contact, status, category];
  client
    .query(SQL, values)
    .then((results) => {
      res.redirect('/');
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}
function updateTask(req, res) {
  const { title, description, category, contact, status } = req.body;
  const SQL =
    'UPDATE tasks SET title=$1,description=$2,category=$3,contact=$4,status=$5 WHERE id=$6';
  const values = [
    title,
    description,
    category,
    contact,
    status,
    req.params.task_id,
  ];
  client
    .query(SQL, values)
    .then((results) => res.redirect(`/tasks/${req.params.task_id}`))
    .catch((err) => errorHandler(err, req, res));
}
function deleteTask(req, res) {
  const SQL = 'DELETE FROM tasks WHERE id=$1';
  const values = [req.params.task_id];
  client
    .query(SQL, values)
    .then((results) => res.redirect('/'))
    .catch((err) => errorHandler(err, req, res));
}
function notFoundHandler(req, res) {
  res.status(404).send('PAGE NOT FOUND');
}
function errorHandler(err, req, res) {
  res.status(500).render('pages/error-view', { error: err });
}
client.connect().then(() => {
  app.listen(PORT, () => console.log('up on', PORT));
});
