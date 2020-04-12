'use strict';
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 4000;
const app = express();
// 1) set the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // render the index.ejs from the views folder
  const url = 'https://www.googleapis.com/books/v1/volumes?q=quilting';
  superagent.get(url).then((apiResponse) => {
    console.log(apiResponse.body.items[0]);
  });
  res.render('index');
});
app.get('/list', (req, res) => {
  const list = ['apples', 'eggs', 'butter', 'milk'];
  // render the list.ejs from the views folder and pass object to it
  res.render('list', { list: list });
});
app.get('/quantities', (req, res) => {
  const quantities = [
    { name: 'apples', quantity: 4 },
    { name: 'eggs', quantity: 12 },
    { name: 'butter', quantity: 1 },
    { name: 'milk', quantity: 6 },
  ];
  res.render('quantities', { q: quantities });
});
app.listen(PORT, () => console.log('OK!'));
